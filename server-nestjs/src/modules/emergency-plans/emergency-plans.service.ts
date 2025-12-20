import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyPlan } from './entities/emergency-plan.entity';
import { EmergencyPlanTask } from './entities/emergency-plan-task.entity';
import { Volunteer } from '../volunteers/entities/volunteer.entity';

@Injectable()
export class EmergencyPlansService {
    constructor(
        @InjectRepository(EmergencyPlan)
        private plansRepository: Repository<EmergencyPlan>,
        @InjectRepository(EmergencyPlanTask)
        private tasksRepository: Repository<EmergencyPlanTask>,
        @InjectRepository(Volunteer)
        private volunteersRepository: Repository<Volunteer>,
    ) { }

    async findForVolunteer(volunteerId: number) {
        return this.plansRepository.find({
            where: { volunteer: { id: volunteerId } },
            relations: ['tasks'],
            order: { id: 'ASC' },
        });
    }

    async createForVolunteer(volunteerId: number, name: string) {
        const volunteer = await this.volunteersRepository.findOne({ where: { id: volunteerId } });
        if (!volunteer) throw new NotFoundException('Volunteer not found');

        const plan = this.plansRepository.create({ name, volunteer });
        return this.plansRepository.save(plan);
    }

    async removeForVolunteer(volunteerId: number, planId: number) {
        const plan = await this.plansRepository.findOne({ where: { id: planId }, relations: ['volunteer'] });
        if (!plan) throw new NotFoundException('Plan not found');
        if (plan.volunteer.id !== volunteerId) throw new ForbiddenException('Not allowed');
        await this.plansRepository.delete(planId);
        return { deleted: true };
    }

    async addTask(volunteerId: number, planId: number, title: string) {
        const plan = await this.plansRepository.findOne({ where: { id: planId }, relations: ['volunteer'] });
        if (!plan) throw new NotFoundException('Plan not found');
        if (plan.volunteer.id !== volunteerId) throw new ForbiddenException('Not allowed');
        const task = this.tasksRepository.create({ title, plan, completed: false });
        return this.tasksRepository.save(task);
    }

    async toggleTask(volunteerId: number, planId: number, taskId: number) {
        const task = await this.tasksRepository.findOne({ where: { id: taskId }, relations: ['plan', 'plan.volunteer'] });
        if (!task) throw new NotFoundException('Task not found');
        if (task.plan.id !== planId) throw new ForbiddenException('Not allowed');
        if (task.plan.volunteer.id !== volunteerId) throw new ForbiddenException('Not allowed');
        task.completed = !task.completed;
        return this.tasksRepository.save(task);
    }

    async removeTask(volunteerId: number, planId: number, taskId: number) {
        const task = await this.tasksRepository.findOne({ where: { id: taskId }, relations: ['plan', 'plan.volunteer'] });
        if (!task) throw new NotFoundException('Task not found');
        if (task.plan.id !== planId) throw new ForbiddenException('Not allowed');
        if (task.plan.volunteer.id !== volunteerId) throw new ForbiddenException('Not allowed');
        await this.tasksRepository.delete(taskId);
        return { deleted: true };
    }
}
