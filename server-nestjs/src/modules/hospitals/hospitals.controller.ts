import { Controller, Get, Post, Put, Delete, UseGuards, Request, Body, Query, Param } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Controller('api/hospitals')
export class HospitalsController {
    constructor(private hospitalsService: HospitalsService) { }

    @Get()
    findAll(@Query('status') status?: string) {
        return this.hospitalsService.findAll(status);
    }

    @Post('register')
    async register(@Body() createHospitalDto: CreateHospitalDto) {
        return this.hospitalsService.create(createHospitalDto);
    }

    @Put('me')
    @UseGuards(JwtGuard)
    async updateProfile(@Request() req, @Body() updateHospitalDto: UpdateHospitalDto) {
        return this.hospitalsService.update(req.user.id, updateHospitalDto);
    }

    @Get('pending')
    @UseGuards(JwtGuard)
    async getPending() {
        return this.hospitalsService.findAll('pending');
    }

    @Put(':id/status')
    @UseGuards(JwtGuard)
    async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
        return this.hospitalsService.updateStatus(+id, body.status);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    async updateHospital(@Param('id') id: string, @Body() updateHospitalDto: UpdateHospitalDto) {
        return this.hospitalsService.update(+id, updateHospitalDto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteHospital(@Param('id') id: string) {
        return this.hospitalsService.remove(+id);
    }
}
