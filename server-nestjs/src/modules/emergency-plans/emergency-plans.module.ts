import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyPlansService } from './emergency-plans.service';
import { EmergencyPlansController } from './emergency-plans.controller';
import { EmergencyPlan } from './entities/emergency-plan.entity';
import { EmergencyPlanTask } from './entities/emergency-plan-task.entity';
import { Volunteer } from '../volunteers/entities/volunteer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EmergencyPlan, EmergencyPlanTask, Volunteer])],
    providers: [EmergencyPlansService],
    controllers: [EmergencyPlansController],
})
export class EmergencyPlansModule { }
