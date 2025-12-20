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
    BadRequestException,
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
        const nid = Number(id);
        if (Number.isNaN(nid)) {
            // Return null (404 behaviour) instead of letting TypeORM try to query with NaN
            return null;
        }
        return this.incidentsService.findOne(nid);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    update(@Param('id') id: string, @Body() updateData: any) {
        return this.incidentsService.update(+id, updateData);
    }

    @Post()
    async create(@Body() createIncidentDto: CreateIncidentDto) {
        // Handle media_files JSON string if provided
        if (createIncidentDto.media_files && typeof createIncidentDto.media_files === 'string') {
            try {
                const mediaFiles = JSON.parse(createIncidentDto.media_files);
                console.log('Received media files:', mediaFiles);
                // You could process the file information here
                // For now, we'll store the JSON string directly
            } catch (error) {
                console.warn('Invalid media_files JSON:', createIncidentDto.media_files);
            }
        }

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
        @Body() body: { volunteer_id: any; notes?: string },
    ) {
        const iid = Number(incidentId);
        const vid = Number(body?.volunteer_id);
        if (Number.isNaN(iid) || Number.isNaN(vid)) {
            throw new BadRequestException('Invalid incident id or volunteer id');
        }
        try {
            return await this.incidentsService.assignVolunteer(iid, vid, body?.notes);
        } catch (err: any) {
            console.error('assign controller error:', err);
            // In development return error details so frontend can surface useful message
            throw new BadRequestException(err?.message || 'Failed to assign volunteer');
        }
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
    async getAssignments() {
        try {
            return await this.incidentsService.getAssignments();
        } catch (err) {
            console.error('Controller: error in getAssignments:', err);
            // Return empty list to the client instead of 500 so UI remains usable
            return [];
        }
    }

    // Raw debug endpoint: returns rows from volunteer_assignments or an error object
    @Get('assignments/debug')
    async getAssignmentsDebug() {
        return this.incidentsService.getAssignmentsRaw();
    }

    @Get('debug')
    async debug() {
        return this.incidentsService.debug();
    }

    @Get('volunteers')
    getVolunteers() {
        return this.volunteersService.findAll();
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async remove(@Param('id') id: string) {
        return this.incidentsService.remove(+id);
    }
}
