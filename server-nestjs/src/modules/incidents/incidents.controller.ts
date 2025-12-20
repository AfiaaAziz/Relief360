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
import { JwtService } from '@nestjs/jwt';




@Controller('api/incidents')
export class IncidentsController {
    constructor(
        private incidentsService: IncidentsService,
        private volunteersService: VolunteersService,
        private jwtService: JwtService,
    ) { }

    @Get()
    findAll() {
        return this.incidentsService.findAll();
    }

    // Only match numeric IDs to avoid catching other named routes like 'my-incidents'
    @Get(':id(\\d+)')
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
    @UseGuards(JwtGuard)
    async create(@Request() req, @Body() createIncidentDto: CreateIncidentDto) {
        // If a user is authenticated, prefer server-side identity instead of trusting client-provided values
        const user = req.user;
        if (user) {
            // overwrite or set reported_by fields from the authenticated user
            createIncidentDto.reported_by_user_id = user.id || createIncidentDto.reported_by_user_id;
            createIncidentDto.reported_by_email = user.email || createIncidentDto.reported_by_email;
        }

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

        const created = await this.incidentsService.create(createIncidentDto);
        return created;
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

    @Get('my-incidents')
    @UseGuards(JwtGuard)
    async getMyIncidents(@Request() req) {
        try {
            let user = req.user;
            console.log('getMyIncidents called with user:', user);

            // Fallback: if JwtGuard didn't set req.user for some reason, try to verify Authorization header manually
            if (!user) {
                const auth = req.headers?.authorization;
                if (auth && typeof auth === 'string') {
                    const parts = auth.split(' ');
                    const token = parts.length === 2 ? parts[1] : null;
                    if (token) {
                        try {
                            const payload: any = this.jwtService.verify(token);
                            console.log('Fallback token verify succeeded:', payload);
                            user = payload;
                        } catch (err) {
                            console.warn('Fallback token verify failed:', err?.message || err);
                            return [];
                        }
                    } else {
                        console.log('No token found in Authorization header');
                        return [];
                    }
                } else {
                    console.log('No Authorization header present');
                    return [];
                }
            }

            // Use user ID if available, otherwise fall back to email
            const userId = user.id || user.user_id;
            const userEmail = user.email;

            console.log('Extracted user identification:', { userId, userEmail });

            // If user has email but no id, we can optionally attempt a repair to link incidents
            const results = await this.incidentsService.findByUser(userId, userEmail);
            console.log('Final results returned to client:', results.length, 'incidents');

            return results;
        } catch (err: any) {
            console.error('Error fetching user incidents:', err);
            return [];
        }
    }

    @Post('repair-my-reports')
    @UseGuards(JwtGuard)
    async repairMyReports(@Request() req) {
        try {
            const user = req.user;
            if (!user) {
                return { error: 'Not authenticated' };
            }
            const userId = user.id || user.user_id;
            const userEmail = user.email;
            console.log(`Repairing reports for userId=${userId}, email=${userEmail}`);
            const result = await this.incidentsService.repairReportsForUser(userId, userEmail);
            return { repaired: result.affected || 0 };
        } catch (err: any) {
            console.error('Error repairing reports:', err);
            return { error: err.message || 'Unknown error' };
        }
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
