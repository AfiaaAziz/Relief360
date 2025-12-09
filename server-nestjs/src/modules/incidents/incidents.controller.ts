import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('api/incidents')
export class IncidentsController {
  constructor(private incidentsService: IncidentsService) {}

  @Get()
  findAll() {
    return this.incidentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentsService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createIncidentDto: CreateIncidentDto, @Request() req) {
    return this.incidentsService.create(createIncidentDto, req.user?.id);
  }

  @Get('severity/:severity')
  getBySeverity(@Param('severity') severity: string) {
    return this.incidentsService.getBySeverity(severity);
  }
}
