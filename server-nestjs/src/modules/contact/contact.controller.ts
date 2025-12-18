import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { ReplyContactMessageDto } from './dto/reply-contact-message.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('api/contact')
export class ContactController {
    constructor(private contactService: ContactService) { }

    @Post('send')
    async sendMessage(@Body() createContactMessageDto: CreateContactMessageDto) {
        const message = await this.contactService.createMessage(
            createContactMessageDto,
        );
        return {
            success: true,
            message: 'Your message has been sent successfully!',
            data: message,
        };
    }

    @Get()
    @UseGuards(JwtGuard, AdminGuard)
    async getAllMessages() {
        return this.contactService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtGuard, AdminGuard)
    async getMessageById(@Param('id') id: string) {
        return this.contactService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtGuard, AdminGuard)
    async updateMessage(
        @Param('id') id: string,
        @Body() updateDto: UpdateContactMessageDto,
    ) {
        return this.contactService.update(+id, updateDto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard, AdminGuard)
    async deleteMessage(@Param('id') id: string) {
        return this.contactService.remove(+id);
    }

    @Post(':id/reply')
    @UseGuards(JwtGuard, AdminGuard)
    async replyToMessage(
        @Param('id') id: string,
        @Body() replyDto: ReplyContactMessageDto,
    ) {
        try {
            return await this.contactService.replyToMessage(+id, replyDto);
        } catch (err: any) {
            // If SMTP is not configured, service may throw a BadRequestException
            // with that specific message. Return a 200-style response with a
            // friendly warning so the frontend doesn't receive a 400.
            if (err instanceof BadRequestException && String(err.message).includes('SMTP')) {
                return { success: true, warning: String(err.message) };
            }
            throw err;
        }
    }
}
