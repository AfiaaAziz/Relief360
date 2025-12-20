import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('api/feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) { }

    // Public endpoint for citizens to submit feedback
    @Post()
    async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
        const feedback = await this.feedbackService.create(createFeedbackDto);
        return {
            success: true,
            message: 'Your feedback has been submitted successfully!',
            data: feedback,
        };
    }

    // Admin endpoints
    @Get()
    @UseGuards(JwtGuard, AdminGuard)
    async getAllFeedback() {
        return this.feedbackService.findAll();
    }

    @Get('stats')
    @UseGuards(JwtGuard, AdminGuard)
    async getFeedbackStats() {
        return this.feedbackService.getFeedbackStats();
    }

    @Get(':id')
    @UseGuards(JwtGuard, AdminGuard)
    async getFeedbackById(@Param('id') id: string) {
        return this.feedbackService.findOne(+id);
    }

    @Put(':id/status')
    @UseGuards(JwtGuard, AdminGuard)
    async updateFeedbackStatus(
        @Param('id') id: string,
        @Body() body: { status: string },
    ) {
        return this.feedbackService.updateStatus(+id, body.status);
    }

    @Delete(':id')
    @UseGuards(JwtGuard, AdminGuard)
    async deleteFeedback(@Param('id') id: string) {
        return this.feedbackService.remove(+id);
    }

    @Post(':id/reply')
    @UseGuards(JwtGuard, AdminGuard)
    async replyToFeedback(
        @Param('id') id: string,
        @Body() body: { subject: string; message: string },
    ) {
        return this.feedbackService.replyToFeedback(+id, body.subject, body.message);
    }
}
