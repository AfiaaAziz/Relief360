import { Injectable } from '@nestjs/common';
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

    async findAll() {
        return this.hospitalsRepository.find();
    }

    async findOne(id: number) {
        return this.hospitalsRepository.findOne({
            where: { id },
        });
    }



    async create(createHospitalDto: CreateHospitalDto): Promise<Hospital> {
        // Check if hospital already exists
        const existingHospital = await this.hospitalsRepository.findOne({
            where: { email: createHospitalDto.email },
        });
        if (existingHospital) {
            throw new Error('Hospital with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(createHospitalDto.password, 10);

        // Create hospital with password stored directly
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
            ambulances: createHospitalDto.ambulances,
            staff_count: createHospitalDto.staffCount,
            contact_name: createHospitalDto.contactName,
            contact_position: createHospitalDto.contactPosition,
            contact_phone: createHospitalDto.contactPhone,
            contact_email: createHospitalDto.contactEmail,
            additional_info: createHospitalDto.additionalInfo,
            services: createHospitalDto.services,
            terms: createHospitalDto.terms,
            data_sharing: createHospitalDto.dataSharing,
            password_hash: hashedPassword,
        });
        return this.hospitalsRepository.save(hospital);
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


}
