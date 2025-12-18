import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
    constructor(
        @InjectRepository(Donation)
        private donationsRepository: Repository<Donation>,
    ) {}

    async create(dto: CreateDonationDto) {
        // Create entity manually to avoid TypeORM typing issues
        const d = new Donation();
        Object.assign(d, dto);
        
        // try to normalize amount_value if string provided
        if (!d.amount_value && dto.amount) {
            const num = parseFloat(String(dto.amount).replace(/[^0-9.]/g, ''));
            d.amount_value = Number.isFinite(num) ? num : null;
        }
        return this.donationsRepository.save(d);
    }

    async findAll() {
        return this.donationsRepository.find({ order: { created_at: 'DESC' } });
    }
}
