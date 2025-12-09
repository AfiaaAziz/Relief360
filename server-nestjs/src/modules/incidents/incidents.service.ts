import { Injectable } from '@nestjs/common';
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
        return this.incidentsRepository.find({
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: number) {
        return this.incidentsRepository.findOne({
            where: { id },
        });
    }

    async create(createIncidentDto: CreateIncidentDto) {
        const incident = this.incidentsRepository.create(createIncidentDto);
        return this.incidentsRepository.save(incident);
    }

    async update(id: number, updateData: Partial<Incident>) {
        await this.incidentsRepository.update(id, updateData);
        return this.incidentsRepository.findOne({
            where: { id },
        });
    }

    async getBySeverity(severity: string) {
        return this.incidentsRepository.find({
            where: { severity },
            order: { created_at: 'DESC' },
        });
    }

    async assignVolunteer(incidentId: number, volunteerId: number, notes?: string) {
        // Check if assignment already exists
        const existingAssignment = await this.assignmentsRepository.findOne({
            where: { incident_id: incidentId, volunteer_id: volunteerId },
        });

        if (existingAssignment) {
            throw new Error('Volunteer is already assigned to this incident');
        }

        // Create assignment
        const assignment = this.assignmentsRepository.create({
            incident_id: incidentId,
            volunteer_id: volunteerId,
            notes: notes,
        });

        // Update volunteer status to assigned
        await this.volunteersService.update(volunteerId, { assigned: true });

        return this.assignmentsRepository.save(assignment);
    }

    async unassignVolunteer(incidentId: number, volunteerId: number) {
        const assignment = await this.assignmentsRepository.findOne({
            where: { incident_id: incidentId, volunteer_id: volunteerId },
        });

        if (!assignment) {
            throw new Error('Assignment not found');
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
        }

        return { message: 'Volunteer unassigned successfully' };
    }

    async getAssignments() {
        return this.assignmentsRepository.find({
            relations: ['volunteer', 'incident'],
        });
    }
}
