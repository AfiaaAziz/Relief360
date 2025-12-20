import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { EmergencyPlansService } from './emergency-plans.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('api/emergency-plans')
export class EmergencyPlansController {
    constructor(private service: EmergencyPlansService) { }

    @Get('me')
    @UseGuards(JwtGuard)
    async myPlans(@Request() req) {
        return this.service.findForVolunteer(req.user.id);
    }

    @Post()
    @UseGuards(JwtGuard)
    async create(@Request() req, @Body() body: { name: string }) {
        return this.service.createForVolunteer(req.user.id, body.name);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async delete(@Request() req, @Param('id') id: string) {
        return this.service.removeForVolunteer(req.user.id, +id);
    }

    @Post(':id/tasks')
    @UseGuards(JwtGuard)
    async addTask(@Request() req, @Param('id') id: string, @Body() body: { title: string }) {
        return this.service.addTask(req.user.id, +id, body.title);
    }

    @Put(':id/tasks/:taskId/toggle')
    @UseGuards(JwtGuard)
    async toggleTask(@Request() req, @Param('id') id: string, @Param('taskId') taskId: string) {
        return this.service.toggleTask(req.user.id, +id, +taskId);
    }

    @Delete(':id/tasks/:taskId')
    @UseGuards(JwtGuard)
    async deleteTask(@Request() req, @Param('id') id: string, @Param('taskId') taskId: string) {
        return this.service.removeTask(req.user.id, +id, +taskId);
    }
}
