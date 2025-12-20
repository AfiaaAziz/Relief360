import { Injectable, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Hospital } from './entities/hospital.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

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

    async update(id: number, hospitalData: UpdateHospitalDto | Partial<Hospital>) {
        try {
            // Check if hospital exists
            const hospital = await this.hospitalsRepository.findOne({
                where: { id },
            });
            
            if (!hospital) {
                throw new BadRequestException(`Hospital with ID ${id} not found`);
            }
            
            // Transform camelCase DTO fields to snake_case entity fields
            const updateData: Partial<Hospital> = {};
            const data = hospitalData as any;
            
            // Map camelCase to snake_case for entity fields
            if (data.totalBeds !== undefined) updateData.total_beds = data.totalBeds;
            else if (data.total_beds !== undefined) updateData.total_beds = data.total_beds;
            
            if (data.icuBeds !== undefined) updateData.icu_beds = data.icuBeds;
            else if (data.icu_beds !== undefined) updateData.icu_beds = data.icu_beds;
            
            if (data.emergencyBeds !== undefined) updateData.emergency_beds = data.emergencyBeds;
            else if (data.emergency_beds !== undefined) updateData.emergency_beds = data.emergency_beds;
            
            if (data.staffCount !== undefined) updateData.staff_count = data.staffCount;
            else if (data.staff_count !== undefined) updateData.staff_count = data.staff_count;
            
            if (data.ambulances !== undefined) updateData.ambulances = data.ambulances;
            
            if (data.hospitalName !== undefined) updateData.hospital_name = data.hospitalName;
            else if (data.hospital_name !== undefined) updateData.hospital_name = data.hospital_name;
            
            if (data.hospitalType !== undefined) updateData.hospital_type = data.hospitalType;
            else if (data.hospital_type !== undefined) updateData.hospital_type = data.hospital_type;
            
            if (data.address !== undefined) updateData.address = data.address;
            if (data.phone !== undefined) updateData.phone = data.phone;
            
            if (data.emergencyPhone !== undefined) updateData.emergency_phone = data.emergencyPhone;
            else if (data.emergency_phone !== undefined) updateData.emergency_phone = data.emergency_phone;
            
            if (data.email !== undefined) updateData.email = data.email;
            
            if (data.contactName !== undefined) updateData.contact_name = data.contactName;
            else if (data.contact_name !== undefined) updateData.contact_name = data.contact_name;
            
            if (data.contactPosition !== undefined) updateData.contact_position = data.contactPosition;
            else if (data.contact_position !== undefined) updateData.contact_position = data.contact_position;
            
            if (data.contactPhone !== undefined) updateData.contact_phone = data.contactPhone;
            else if (data.contact_phone !== undefined) updateData.contact_phone = data.contact_phone;
            
            if (data.contactEmail !== undefined) updateData.contact_email = data.contactEmail;
            else if (data.contact_email !== undefined) updateData.contact_email = data.contact_email;
            
            if (data.additionalInfo !== undefined) updateData.additional_info = data.additionalInfo;
            else if (data.additional_info !== undefined) updateData.additional_info = data.additional_info;
            
            if (data.services !== undefined) updateData.services = data.services;
            
            // Only update if there's data to update
            if (Object.keys(updateData).length === 0) {
                return hospital;
            }
            
            console.log('Updating hospital with data:', updateData);
            
            await this.hospitalsRepository.update(id, updateData);
            return this.hospitalsRepository.findOne({
                where: { id },
            });
        } catch (error) {
            console.error('Error in update method:', error);
            throw error;
        }
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
