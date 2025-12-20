import { Controller, Get, Post, Put, Delete, UseGuards, Request, Body, Param } from '@nestjs/common';
import { CitizensService } from './citizens.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateCitizenDto } from './dto/create-citizen.dto';

@Controller(['api/citizens', 'api/citizen-registration'])
export class CitizensController {
    constructor(private citizensService: CitizensService) { }

    @Get()
    findAll() {
        return this.citizensService.findAllWithIncidentCounts();
    }

    @Get('stats')
    getStats() {
        return this.citizensService.getCitizensStats();
    }

    @Get('me')
    @UseGuards(JwtGuard)
    async getProfile(@Request() req) {
        return this.citizensService.findOne(req.user.id);
    }

    @Post()
    async register(@Body() createCitizenDto: CreateCitizenDto) {
        return this.citizensService.create(createCitizenDto);
    }

    @Post('register')
    async registerWithPath(@Body() createCitizenDto: CreateCitizenDto) {
        return this.citizensService.create(createCitizenDto);
    }

    @Put('me')
    @UseGuards(JwtGuard)
    async updateProfile(@Request() req, @Body() updateData: Partial<CreateCitizenDto>) {
        return this.citizensService.update(req.user.id, updateData);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    async updateCitizen(@Param('id') id: string, @Body() updateData: Partial<CreateCitizenDto>) {
        return this.citizensService.update(+id, updateData);
    }

    @Put(':id/block')
    @UseGuards(JwtGuard)
    async blockCitizen(@Param('id') id: string) {
        return this.citizensService.blockCitizen(+id);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteCitizen(@Param('id') id: string) {
        return this.citizensService.remove(+id);
    }
}

