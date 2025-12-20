import { Injectable, ServiceUnavailableException, ConflictException, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { VolunteerAssignment } from './entities/volunteer-assignment.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { VolunteersService } from '../volunteers/volunteers.service';

@Injectable()
export class IncidentsService {
    constructor(
        @InjectRepository(Incident)
        private incidentsRepository: Repository<Incident>,
        @InjectRepository(VolunteerAssignment)
        private assignmentsRepository: Repository<VolunteerAssignment>,
        private volunteersService: VolunteersService,
    ) { }

    async findAll() {
        try {
            return await this.incidentsRepository.find({
                order: { created_at: 'DESC' },
            });
        } catch (err: any) {
            // Postgres: 42P01 = undefined_table
            if (err?.code === '42P01') {
                console.error(
                    'Database table "incidents" is missing. Create it (or run the SQL migration) to enable incidents features.',
                    err,
                );
                // Keep admin UI usable even if DB isn't initialized yet
                return [];
            }
            throw err;
        }
    }

    async findOne(id: number) {
        try {
            return await this.incidentsRepository.findOne({
                where: { id },
            });
        } catch (err: any) {
            if (err?.code === '42P01') {
                return null;
            }
            throw err;
        }
    }

    async create(createIncidentDto: CreateIncidentDto) {
        try {
            const incident = this.incidentsRepository.create(createIncidentDto);
            return await this.incidentsRepository.save(incident);
        } catch (err: any) {
            if (err?.code === '42P01') {
                throw new ServiceUnavailableException(
                    'Database table "incidents" is missing. Create it (or run the SQL migration) before creating incidents.',
                );
            }
            throw err;
        }
    }

    async update(id: number, updateData: Partial<Incident>) {
        try {
            await this.incidentsRepository.update(id, updateData);
            const updatedIncident = await this.incidentsRepository.findOne({
                where: { id },
            });

            // If incident is being marked as resolved, sync assignment status
            if (updatedIncident && updateData.status === 'Resolved') {
                await this.syncAssignmentStatusWithIncident(id, 'completed');
            }
            // If incident is being marked as in progress, sync assignment status  
            else if (updatedIncident && updateData.status === 'In Progress') {
                await this.syncAssignmentStatusWithIncident(id, 'in_progress');
            }

            return updatedIncident;
        } catch (err: any) {
            if (err?.code === '42P01') {
                throw new ServiceUnavailableException(
                    'Database table "incidents" is missing. Create it (or run the SQL migration) before updating incidents.',
                );
            }
            throw err;
        }
    }

    // Helper method to sync assignment status with incident status
    private async syncAssignmentStatusWithIncident(incidentId: number, assignmentStatus: string) {
        try {
            const assignment = await this.assignmentsRepository.findOne({
                where: { incident_id: incidentId },
            });

            if (assignment && assignment.status !== assignmentStatus) {
                assignment.status = assignmentStatus;
                await this.assignmentsRepository.save(assignment);
                console.log(`Synced assignment ${assignment.id} status to ${assignmentStatus}`);
            }
        } catch (err) {
            console.error('Failed to sync assignment status:', err);
        }
    }

    async getBySeverity(severity: string) {
        try {
            return await this.incidentsRepository.find({
                where: { severity },
                order: { created_at: 'DESC' },
            });
        } catch (err: any) {
            if (err?.code === '42P01') {
                return [];
            }
            throw err;
        }
    }

    async assignVolunteer(incidentId: number, volunteerId: number, notes?: string) {
        try {
            if (Number.isNaN(incidentId) || Number.isNaN(volunteerId)) {
                throw new BadRequestException('Invalid incident or volunteer id');
            }
            console.log(`assignVolunteer called with incidentId=${incidentId}, volunteerId=${volunteerId}`);
            // Check if assignment already exists
            const existingAssignment = await this.assignmentsRepository.findOne({
                where: { incident_id: incidentId, volunteer_id: volunteerId },
            });

            if (existingAssignment) {
                throw new ConflictException('Volunteer is already assigned to this incident');
            }

            // Create assignment
            const assignment = this.assignmentsRepository.create({
                incident_id: incidentId,
                volunteer_id: volunteerId,
                notes: notes,
            });

            // Update volunteer status to assigned
            await this.volunteersService.update(volunteerId, { assigned: true });

            const saved = await this.assignmentsRepository.save(assignment);

            // Also update the incident to record assigned volunteer
            try {
                await this.incidentsRepository.update(incidentId, { assigned_volunteer_id: volunteerId });
            } catch (err) {
                console.error('Failed to update incident assigned_volunteer_id:', err);
            }

            return saved;
        } catch (err: any) {
            console.error('Error in assignVolunteer:', err);
            if (err?.status) throw err; // rethrow HttpExceptions
            throw new InternalServerErrorException('Failed to assign volunteer');
        }
    }

    async unassignVolunteer(incidentId: number, volunteerId: number) {
        try {
            const assignment = await this.assignmentsRepository.findOne({
                where: { incident_id: incidentId, volunteer_id: volunteerId },
            });

            if (!assignment) {
                throw new NotFoundException('Assignment not found');
            }

            // Remove assignment
            await this.assignmentsRepository.remove(assignment);

            // Check if volunteer has any other assignments
            const otherAssignments = await this.assignmentsRepository.find({
                where: { volunteer_id: volunteerId },
            });

            // If no other assignments, update volunteer status to unassigned
            if (otherAssignments.length === 0) {
                await this.volunteersService.update(volunteerId, { assigned: false });
                try {
                    // Clear assigned_volunteer_id on the incident if this volunteer was assigned there
                    const incident = await this.incidentsRepository.findOne({ where: { id: incidentId } });
                    if (incident && incident.assigned_volunteer_id === volunteerId) {
                        await this.incidentsRepository.update(incidentId, { assigned_volunteer_id: null });
                    }
                } catch (err) {
                    console.error('Failed to clear incident assigned_volunteer_id:', err);
                }
            }

            return { message: 'Volunteer unassigned successfully' };
        } catch (err: any) {
            console.error('Error in unassignVolunteer:', err);
            if (err?.status) throw err;
            throw new InternalServerErrorException('Failed to unassign volunteer');
        }
    }

    async getAssignments() {
        try {
            return await this.assignmentsRepository.find({
                relations: ['volunteer', 'incident'],
            });
        } catch (err: any) {
            // Log full error to help debugging and return empty assignments to frontend
            console.error('Error fetching assignments:', err);
            // If table missing, return empty list (keeps UI usable in dev)
            if (err?.code === '42P01') {
                console.error(
                    'Database table "volunteer_assignments" is missing. Create it (or run the SQL migration) to enable assignment features.',
                    err,
                );
                return [];
            }
            return [];
        }
    }

    // Get assignments for a specific volunteer
    async getAssignmentsForVolunteer(volunteerId: number) {
        try {
            const assignments = await this.assignmentsRepository.find({
                where: { volunteer_id: volunteerId },
                relations: ['incident'],
                order: { assigned_at: 'DESC' },
            });

            // Transform the data to match frontend expectations with enhanced status mapping
            return assignments.map(assignment => {
                const incident = assignment.incident;

                // Enhanced status mapping logic
                let mappedStatus = assignment.status;

                // If incident is resolved, override assignment status to completed
                if (incident && incident.status === 'Resolved') {
                    mappedStatus = 'completed';
                }
                // If incident is in progress, mark assignment as in progress
                else if (incident && incident.status === 'In Progress') {
                    mappedStatus = 'in_progress';
                }
                // Default assignment status logic
                else if (assignment.status === 'assigned') {
                    mappedStatus = 'assigned';
                }

                return {
                    id: assignment.id,
                    assigned_at: assignment.assigned_at,
                    status: mappedStatus,
                    notes: assignment.notes,
                    incident: incident ? {
                        id: incident.id,
                        title: incident.title,
                        description: incident.description,
                        location: incident.location,
                        severity: incident.severity,
                        status: incident.status,
                        created_at: incident.created_at,
                        // Map status for frontend compatibility
                        type: incident.title || 'Emergency', // Using title as type fallback
                        date: incident.created_at
                    } : null
                };
            });
        } catch (err: any) {
            console.error('Error fetching assignments for volunteer:', err);
            if (err?.code === '42P01') return [];
            return [];
        }
    }

    // Debug helpers removed: getAssignmentsRaw was removed

    // Get available incidents that volunteers can browse and accept
    async getAvailableIncidentsForVolunteer(volunteerId: number) {
        try {
            // Get incidents that are not assigned to any volunteer
            const availableIncidents = await this.incidentsRepository
                .createQueryBuilder('incident')
                .where('incident.assigned_volunteer_id IS NULL')
                .andWhere("incident.status != 'Resolved'")
                .orderBy('incident.created_at', 'DESC')
                .getMany();

            // Transform to match frontend expectations
            return availableIncidents.map(incident => ({
                id: incident.id,
                title: incident.title,
                description: incident.description,
                location: incident.location,
                severity: incident.severity,
                status: incident.status,
                created_at: incident.created_at,
                // Map fields for frontend compatibility
                type: incident.title || 'Emergency', // Using title as type fallback
                date: incident.created_at
            }));
        } catch (err: any) {
            console.error('Error fetching available incidents for volunteer:', err);
            if (err?.code === '42P01') return [];
            return [];
        }
    }

    async remove(id: number) {
        try {
            // First, delete all assignments related to this incident
            const assignments = await this.assignmentsRepository.find({
                where: { incident_id: id },
            });
            if (assignments.length > 0) {
                await this.assignmentsRepository.remove(assignments);
            }

            // Then delete the incident
            const incident = await this.incidentsRepository.findOne({
                where: { id },
            });
            if (!incident) {
                throw new Error('Incident not found');
            }
            await this.incidentsRepository.remove(incident);
            return { message: 'Incident deleted successfully' };
        } catch (err: any) {
            if (err?.code === '42P01') {
                throw new ServiceUnavailableException(
                    'Database table "incidents" is missing. Create it (or run the SQL migration) before deleting incidents.',
                );
            }
            throw err;
        }
    }

    // Get incidents for the current logged-in user
    async findByUser(userId: number, userEmail?: string) {
        try {
            console.log('🔍 findByUser called with:', { userId, userEmail });

            // Build a single query that matches either the user id or the email (case-insensitive)
            const qb = this.incidentsRepository.createQueryBuilder('incident')
                .orderBy('incident.created_at', 'DESC');

            if (userId && userEmail) {
                qb.where('(incident.reported_by_user_id = :userId) OR (LOWER(incident.reported_by_email) = LOWER(:userEmail))', { userId, userEmail });
            } else if (userId) {
                qb.where('incident.reported_by_user_id = :userId', { userId });
            } else if (userEmail) {
                qb.where('LOWER(incident.reported_by_email) = LOWER(:userEmail)', { userEmail });
            } else {
                console.log('🔍 No user identifier provided, returning empty array');
                return [];
            }

            const incidents = await qb.getMany();
            console.log('✅ findByUser results count:', incidents.length);
            return incidents;

        } catch (err: any) {
            console.error('❌ Error in findByUser:', err);
            if (err?.code === '42P01') {
                return [];
            }
            return [];
        }
    }

    // Debug helper removed: debug() has been removed


    // Repair reports: set reported_by_user_id for incidents matching the user's email where it's null
    async repairReportsForUser(userId: number, userEmail: string) {
        try {
            if (!userId || !userEmail) return { affected: 0 };

            const res = await this.incidentsRepository.createQueryBuilder()
                .update()
                .set({ reported_by_user_id: userId })
                .where('reported_by_user_id IS NULL')
                .andWhere('LOWER(reported_by_email) = LOWER(:email)', { email: userEmail })
                .execute();

            console.log(`repairReportsForUser: updated ${res?.affected || 0} rows for user ${userId}`);
            return res;
        } catch (err: any) {
            console.error('Error in repairReportsForUser:', err);
            return { affected: 0 };
        }
    }
}
