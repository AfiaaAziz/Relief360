import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(Feedback)
        private feedbackRepository: Repository<Feedback>,
    ) { }

    async create(createFeedbackDto: CreateFeedbackDto) {
        const feedback = this.feedbackRepository.create(createFeedbackDto);
        return this.feedbackRepository.save(feedback);
    }

    async findAll() {
        return this.feedbackRepository.find({
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: number) {
        const feedback = await this.feedbackRepository.findOne({
            where: { id },
        });

        if (!feedback) {
            throw new NotFoundException('Feedback not found');
        }

        return feedback;
    }

    async updateStatus(id: number, status: string) {
        const feedback = await this.findOne(id);

        feedback.status = status;
        return this.feedbackRepository.save(feedback);
    }

    async remove(id: number) {
        const feedback = await this.findOne(id);

        await this.feedbackRepository.remove(feedback);
        return { success: true };
    }

    async getFeedbackStats() {
        const total = await this.feedbackRepository.count();
        const pending = await this.feedbackRepository.count({ where: { status: 'pending' } });
        const resolved = await this.feedbackRepository.count({ where: { status: 'resolved' } });

        return {
            total,
            pending,
            resolved,
        };
    }

    async replyToFeedback(id: number, subject: string, message: string) {
        const feedback = await this.findOne(id);

        // Here you would typically send an email reply
        // For now, we'll just log it and mark the feedback as resolved
        console.log(`Replying to feedback ${id}:`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);

        // Update status to resolved when replied
        feedback.status = 'resolved';
        await this.feedbackRepository.save(feedback);

        return {
            success: true,
            message: 'Reply sent successfully',
        };
    }
}
