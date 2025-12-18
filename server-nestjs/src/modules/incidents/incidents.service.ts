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
            return await this.incidentsRepository.findOne({
                where: { id },
            });
        } catch (err: any) {
            if (err?.code === '42P01') {
                throw new ServiceUnavailableException(
                    'Database table "incidents" is missing. Create it (or run the SQL migration) before updating incidents.',
                );
            }
            throw err;
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

    // Return raw assignments rows (no relations) for debugging purposes
    async getAssignmentsRaw() {
        try {
            // Use a simple query to avoid relation-loading issues
            const rows = await this.assignmentsRepository.query('SELECT id, volunteer_id, incident_id, assigned_at, status, notes FROM volunteer_assignments');
            return rows || [];
        } catch (err: any) {
            console.error('Error fetching raw assignments:', err);
            // Always return an array to keep the frontend parsing stable
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

    // Debug helper: return counts and sample rows for quick troubleshooting
    async debug() {
        const result: any = {};
        try {
            result.volunteers = await this.volunteersService.findAll();
        } catch (err) {
            result.volunteersError = String(err.message || err);
        }

        try {
            result.incidents = await this.incidentsRepository.find();
        } catch (err) {
            result.incidentsError = String(err.message || err);
        }

        try {
            result.assignments = await this.assignmentsRepository.find({ relations: ['volunteer', 'incident'] });
        } catch (err) {
            result.assignmentsError = String(err.message || err);
        }

        return result;
    }
}
