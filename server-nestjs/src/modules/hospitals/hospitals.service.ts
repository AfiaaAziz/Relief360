import { Injectable, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Hospital } from './entities/hospital.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';

@Injectable()
export class HospitalsService {
    constructor(
        @InjectRepository(Hospital)
        private hospitalsRepository: Repository<Hospital>,
    ) { }

    async findAll(status?: string) {
        if (status) {
            return this.hospitalsRepository.find({
                where: { status },
            });
        }
        return this.hospitalsRepository.find();
    }

    async findOne(id: number) {
        return this.hospitalsRepository.findOne({
            where: { id },
        });
    }



    async create(createHospitalDto: CreateHospitalDto): Promise<Hospital> {
        // Validate required fields
        if (!createHospitalDto.email) {
            throw new BadRequestException('Email is required for hospital registration');
        }

        if (!createHospitalDto.password || createHospitalDto.password.length < 6) {
            throw new BadRequestException('Password is required and must be at least 6 characters long');
        }

        // Check if hospital already exists
        const existingHospital = await this.hospitalsRepository.findOne({
            where: { email: createHospitalDto.email },
        });
        if (existingHospital) {
            throw new ConflictException('Hospital with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(createHospitalDto.password, 10);

        // Handle services array - ensure it's an array or null
        const servicesArray = Array.isArray(createHospitalDto.services) && createHospitalDto.services.length > 0
            ? createHospitalDto.services
            : null;

        // Create hospital with validated/normalized fields
        const hospital = this.hospitalsRepository.create({
            hospital_name: createHospitalDto.hospitalName,
            hospital_type: createHospitalDto.hospitalType,
            address: createHospitalDto.address,
            phone: createHospitalDto.phone,
            emergency_phone: createHospitalDto.emergencyPhone,
            email: createHospitalDto.email,
            total_beds: createHospitalDto.totalBeds,
            icu_beds: createHospitalDto.icuBeds,
            emergency_beds: createHospitalDto.emergencyBeds,
            ambulances: createHospitalDto.ambulances ?? null,
            staff_count: createHospitalDto.staffCount,
            contact_name: createHospitalDto.contactName,
            contact_position: createHospitalDto.contactPosition,
            contact_phone: createHospitalDto.contactPhone,
            contact_email: createHospitalDto.contactEmail,
            additional_info: createHospitalDto.additionalInfo || null,
            services: servicesArray,
            terms: createHospitalDto.terms ?? false,
            data_sharing: createHospitalDto.dataSharing ?? false,
            password_hash: hashedPassword,
        });

        try {
            return await this.hospitalsRepository.save(hospital);
        } catch (err) {
            // Log the actual error for debugging
            console.error('Error saving hospital registration:', err);
            // Return a clearer HTTP error to the client and preserve server log
            const errorMessage = err?.message || 'Failed to save hospital registration';
            throw new InternalServerErrorException(errorMessage);
        }
    }

    async createBasic(hospitalData: Partial<Hospital>) {
        const hospital = this.hospitalsRepository.create(hospitalData);
        return this.hospitalsRepository.save(hospital);
    }

    async update(id: number, hospitalData: Partial<Hospital>) {
        await this.hospitalsRepository.update(id, hospitalData);
        return this.hospitalsRepository.findOne({
            where: { id },
        });
    }

    async updateStatus(id: number, status: string) {
        await this.hospitalsRepository.update(id, { status });
        return this.hospitalsRepository.findOne({
            where: { id },
        });
    }

    async remove(id: number) {
        const result = await this.hospitalsRepository.delete(id);
        return { deleted: result.affected > 0 };
    }
}
