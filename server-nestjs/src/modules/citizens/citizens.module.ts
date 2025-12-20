import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitizensService } from './citizens.service';
import { CitizensController } from './citizens.controller';
import { Citizen } from './entities/citizen.entity';
import { Incident } from '../incidents/entities/incident.entity';
import { IncidentsModule } from '../incidents/incidents.module';

@Module({
    imports: [TypeOrmModule.forFeature([Citizen, Incident]), IncidentsModule],
    controllers: [CitizensController],
    providers: [CitizensService],
    exports: [CitizensService],
})
export class CitizensModule { }

