import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { VolunteersService } from '../volunteers/volunteers.service';

@Controller('api/incidents')
export class IncidentsController {
    constructor(
        private incidentsService: IncidentsService,
        private volunteersService: VolunteersService,
    ) { }

    @Get()
    findAll() {
        return this.incidentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.incidentsService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    update(@Param('id') id: string, @Body() updateData: any) {
        return this.incidentsService.update(+id, updateData);
    }

    @Post()
    create(@Body() createIncidentDto: CreateIncidentDto) {
        return this.incidentsService.create(createIncidentDto);
    }

    @Get('severity/:severity')
    getBySeverity(@Param('severity') severity: string) {
        return this.incidentsService.getBySeverity(severity);
    }

    @Post(':id/assign')
    @UseGuards(JwtGuard)
    async assignVolunteer(
        @Param('id') incidentId: string,
        @Body() body: { volunteer_id: number; notes?: string },
    ) {
        return this.incidentsService.assignVolunteer(+incidentId, body.volunteer_id, body.notes);
    }

    @Delete(':id/assign/:volunteerId')
    @UseGuards(JwtGuard)
    async unassignVolunteer(
        @Param('id') incidentId: string,
        @Param('volunteerId') volunteerId: string,
    ) {
        return this.incidentsService.unassignVolunteer(+incidentId, +volunteerId);
    }

    @Get('assignments')
    getAssignments() {
        return this.incidentsService.getAssignments();
    }

    @Get('volunteers')
    getVolunteers() {
        return this.volunteersService.findAll();
    }
}
