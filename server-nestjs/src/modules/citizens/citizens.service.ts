import { Injectable, ConflictException, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Citizen } from './entities/citizen.entity';
import { CreateCitizenDto } from './dto/create-citizen.dto';

@Injectable()
export class CitizensService {
    constructor(
        @InjectRepository(Citizen)
        private citizensRepository: Repository<Citizen>,
    ) { }

    async findAll() {
        return this.citizensRepository.find({
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: number) {
        const citizen = await this.citizensRepository.findOne({
            where: { id: id },
        });
        if (!citizen) {
            throw new NotFoundException('Citizen not found');
        }
        return citizen;
    }

    async findByEmail(email: string) {
        return this.citizensRepository.findOne({
            where: { email: email },
        });
    }

    async create(createCitizenDto: CreateCitizenDto): Promise<Citizen> {
        // Validate email
        if (!createCitizenDto.email) {
            throw new BadRequestException('Email is required');
        }

        // Check if citizen already exists
        const existingCitizen = await this.citizensRepository.findOne({
            where: { email: createCitizenDto.email },
        });
        if (existingCitizen) {
            throw new ConflictException('Citizen with this email already exists');
        }

        // Validate password
        if (!createCitizenDto.password || createCitizenDto.password.length < 6) {
            throw new BadRequestException('Password must be at least 6 characters');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(createCitizenDto.password, 10);

        try {
            // Create citizen
            const citizen = this.citizensRepository.create({
                first_name: createCitizenDto.first_name,
                last_name: createCitizenDto.last_name,
                email: createCitizenDto.email,
                phone: createCitizenDto.phone,
                address: createCitizenDto.address || null,
                city: createCitizenDto.city || null,
                postal_code: createCitizenDto.postal_code || null,
                password_hash: hashedPassword,
            });

            const savedCitizen = await this.citizensRepository.save(citizen);
            
            // Return citizen without password_hash
            const { password_hash: _, ...result } = savedCitizen;
            return result as any;
        } catch (error) {
            if (error.code === '23505') { // PostgreSQL unique violation
                throw new ConflictException('Email already exists');
            }
            throw new InternalServerErrorException('Failed to create citizen');
        }
    }

    async update(id: number, updateData: Partial<CreateCitizenDto>): Promise<Citizen> {
        const citizen = await this.findOne(id);

        // If password is being updated, hash it
        if (updateData.password) {
            const { password, ...rest } = updateData;
            citizen.password_hash = await bcrypt.hash(password, 10);
            Object.assign(citizen, rest);
        } else {
            Object.assign(citizen, updateData);
        }

        const updated = await this.citizensRepository.save(citizen);
        const { password_hash: _, ...result } = updated;
        return result as any;
    }

    async remove(id: number): Promise<void> {
        const citizen = await this.findOne(id);
        await this.citizensRepository.remove(citizen);
    }
}

