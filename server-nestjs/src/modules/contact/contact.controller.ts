import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

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
    async getAllMessages() {
        return this.contactService.findAll();
    }

    @Get(':id')
    async getMessageById(@Param('id') id: string) {
        return this.contactService.findOne(+id);
    }
}
