import { Controller, Get, Post, Put, Delete, UseGuards, Request, Body, Param } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';

@Controller(['api/volunteers', 'api/volunteer-registration'])
export class VolunteersController {
    constructor(private volunteersService: VolunteersService) { }

    @Get()
    findAll() {
        return this.volunteersService.findAll();
    }

    @Get('me')
    @UseGuards(JwtGuard)
    async getProfile(@Request() req) {
        return this.volunteersService.findOne(req.user.id);
    }

    @Post()
    async register(@Body() createVolunteerDto: CreateVolunteerDto) {
        return this.volunteersService.create(createVolunteerDto);
    }

    @Put('me')
    @UseGuards(JwtGuard)
    async updateProfile(@Request() req, @Body() updateVolunteerDto: UpdateVolunteerDto) {
        return this.volunteersService.update(req.user.id, updateVolunteerDto);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    async updateVolunteer(@Param('id') id: string, @Body() updateVolunteerDto: UpdateVolunteerDto) {
        return this.volunteersService.update(+id, updateVolunteerDto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteVolunteer(@Param('id') id: string) {
        return this.volunteersService.remove(+id);
    }
}
