import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';

@Injectable()
export class IncidentsService {
    constructor(
        @InjectRepository(Incident)
        private incidentsRepository: Repository<Incident>,
    ) { }

    async findAll() {
        return this.incidentsRepository.find({
            order: { reported_at: 'DESC' },
        });
    }

    async findOne(id: number) {
        return this.incidentsRepository.findOne({
            where: { incident_id: id },
        });
    }

    async create(createIncidentDto: CreateIncidentDto, userId?: number) {
        const incident = this.incidentsRepository.create({
            ...createIncidentDto,
            reported_by_user_id: userId,
        });
        return this.incidentsRepository.save(incident);
    }

    async update(id: number, updateData: Partial<Incident>) {
        await this.incidentsRepository.update(id, updateData);
        return this.incidentsRepository.findOne({
            where: { incident_id: id },
        });
    }

    async getBySeverity(severity: string) {
        return this.incidentsRepository.find({
            where: { severity },
            order: { reported_at: 'DESC' },
        });
    }
}
