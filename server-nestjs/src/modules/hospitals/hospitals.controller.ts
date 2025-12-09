import { Controller, Get, Post, Put, UseGuards, Request, Body } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Controller('api/hospitals')
export class HospitalsController {
    constructor(private hospitalsService: HospitalsService) { }

    @Get()
    findAll() {
        return this.hospitalsService.findAll();
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
}
