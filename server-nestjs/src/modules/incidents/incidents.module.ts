import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { Incident } from './entities/incident.entity';
import { VolunteerAssignment } from './entities/volunteer-assignment.entity';
import { VolunteersModule } from '../volunteers/volunteers.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Incident, VolunteerAssignment]), VolunteersModule, AuthModule],
    controllers: [IncidentsController],
    providers: [IncidentsService],
    exports: [IncidentsService],
})
export class IncidentsModule { }
