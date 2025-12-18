import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { ContactMessage } from './entities/contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { ReplyContactMessageDto } from './dto/reply-contact-message.dto';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(ContactMessage)
        private contactRepository: Repository<ContactMessage>,
        private configService: ConfigService,
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

    async update(id: number, updateDto: UpdateContactMessageDto) {
        const existing = await this.findOne(id);
        if (!existing) {
            throw new NotFoundException('Message not found');
        }

        const updated = this.contactRepository.merge(existing, updateDto);
        return this.contactRepository.save(updated);
    }

    async remove(id: number) {
        const existing = await this.findOne(id);
        if (!existing) {
            throw new NotFoundException('Message not found');
        }

        await this.contactRepository.remove(existing);
        return { success: true };
    }

    async replyToMessage(id: number, replyDto: ReplyContactMessageDto) {
        const existing = await this.findOne(id);
        if (!existing) {
            throw new NotFoundException('Message not found');
        }

        const smtpHost = this.configService.get<string>('SMTP_HOST');
        const smtpPortRaw = this.configService.get<string>('SMTP_PORT') || '587';
        const smtpPort = parseInt(smtpPortRaw, 10);
        const smtpUser = this.configService.get<string>('SMTP_USER');
        const smtpPass = this.configService.get<string>('SMTP_PASS');
        const smtpFrom = this.configService.get<string>('SMTP_FROM') || smtpUser;
        const smtpSecureEnv = (this.configService.get<string>('SMTP_SECURE') || '').toLowerCase();
        const smtpSecure = smtpSecureEnv === 'true' || smtpPort === 465;

        const subject =
            replyDto?.subject?.trim() ||
            (existing.subject ? `Re: ${existing.subject}` : 'Re: Your message to Relief360');

        const replyText = replyDto?.message?.trim();
        if (!replyText) {
            throw new BadRequestException('Reply message is required');
        }

        // Prefer real SMTP when fully configured, otherwise fall back to
        // an Ethereal test account so admins can actually send and preview
        // messages during development.
        let transporter: nodemailer.Transporter;
        let usedEthereal = false;

        const hasRealSmtp = !!(smtpHost && smtpUser && smtpPass);
        if (hasRealSmtp) {
            transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpSecure,
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
            });
        } else {
            // Create an Ethereal test account for development convenience.
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
            usedEthereal = true;
            console.warn('SMTP not configured — using Ethereal test account for reply.');
        }

        const info = await transporter.sendMail({
            from: smtpFrom,
            to: existing.email,
            subject,
            text: replyText,
        });

        const result: any = { success: true };
        if (usedEthereal) {
            const preview = nodemailer.getTestMessageUrl(info) || null;
            if (preview) {
                result.previewUrl = preview;
                console.info('Ethereal preview URL for sent reply:', preview);
            }
        }

        return result;
    }
}
