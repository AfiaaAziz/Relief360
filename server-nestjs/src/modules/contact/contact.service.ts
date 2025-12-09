import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './entities/contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(ContactMessage)
        private contactRepository: Repository<ContactMessage>,
    ) { }

    async createMessage(createContactMessageDto: CreateContactMessageDto) {
        const message = this.contactRepository.create(createContactMessageDto);
        return this.contactRepository.save(message);
    }

    async findAll() {
        return this.contactRepository.find({
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: number) {
        return this.contactRepository.findOne({
            where: { id },
        });
    }
}
