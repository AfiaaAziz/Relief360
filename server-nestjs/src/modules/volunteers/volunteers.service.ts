import { Injectable, ConflictException, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Volunteer } from './entities/volunteer.entity';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';

@Injectable()
export class VolunteersService {
    constructor(
        @InjectRepository(Volunteer)
        private volunteersRepository: Repository<Volunteer>,
    ) { }

    async findAll() {
        return this.volunteersRepository.find();
    }

    async findOne(id: number) {
        return this.volunteersRepository.findOne({
            where: { id: id },
        });
    }



    async create(createVolunteerDto: CreateVolunteerDto): Promise<Volunteer> {
        // Validate email
        if (!createVolunteerDto.email) {
            throw new BadRequestException('Email is required');
        }

        // Check if volunteer already exists
        const existingVolunteer = await this.volunteersRepository.findOne({
            where: { email: createVolunteerDto.email },
        });
        if (existingVolunteer) {
            throw new ConflictException('Volunteer with this email already exists');
        }

        // Hash the password (use a default empty string if not provided to avoid bcrypt errors)
        const hashedPassword = await bcrypt.hash(createVolunteerDto.password || '', 10);

        // Create volunteer with password stored directly
        const volunteer = this.volunteersRepository.create({
            first_name: createVolunteerDto.first_name,
            last_name: createVolunteerDto.last_name,
            email: createVolunteerDto.email,
            phone: createVolunteerDto.phone,
            age: createVolunteerDto.age,
            availability: createVolunteerDto.availability,
            address: createVolunteerDto.address,
            experience: createVolunteerDto.experience,
            motivation: createVolunteerDto.motivation,
            terms_accepted: createVolunteerDto.terms_accepted,
            background_check: createVolunteerDto.background_check,
            skills: createVolunteerDto.selected_skills,
            password_hash: hashedPassword,
        });

        try {
            return await this.volunteersRepository.save(volunteer);
        } catch (err) {
            console.error('Error saving volunteer:', err);
            throw new InternalServerErrorException('Failed to save volunteer');
        }
    }

    async update(id: number, volunteerData: Partial<Volunteer>) {
        try {
            // Normalize incoming payload: map `selected_skills` -> `skills` if present
            const updatePayload: any = { ...volunteerData };
            if ((volunteerData as any).selected_skills !== undefined) {
                updatePayload.skills = (volunteerData as any).selected_skills;
                delete updatePayload.selected_skills;
            }

            // Ensure we don't try to update non-existing entity properties
            const allowedKeys = [
                'first_name',
                'last_name',
                'email',
                'phone',
                'age',
                'availability',
                'address',
                'experience',
                'motivation',
                'terms_accepted',
                'background_check',
                'skills',
                'assigned',
            ];
            const safePayload: any = {};
            for (const k of allowedKeys) {
                if (updatePayload[k] !== undefined) safePayload[k] = updatePayload[k];
            }

            console.log('VolunteersService.update: id=', id, 'safePayload=', safePayload);
            await this.volunteersRepository.update(id, safePayload);
            const updated = await this.volunteersRepository.findOne({ where: { id: id } });
            console.log('VolunteersService.update: updated=', updated);
            if (!updated) throw new NotFoundException('Volunteer not found');
            return updated;
        } catch (err) {
            console.error('Error updating volunteer:', err);
            throw err;
        }
    }

    async remove(id: number) {
        try {
            // Try to delete volunteer; if FK constraint prevents it, remove related assignments first
            try {
                const result = await this.volunteersRepository.delete(id);
                return { deleted: result.affected > 0 };
            } catch (err: any) {
                // Postgres FK violation code
                if (err?.code === '23503') {
                    console.warn('FK constraint when deleting volunteer; removing related volunteer_assignments and retrying.', err.message);
                    // Remove related assignments then retry
                    await this.volunteersRepository.query('DELETE FROM volunteer_assignments WHERE volunteer_id = $1', [id]);
                    const resultRetry = await this.volunteersRepository.delete(id);
                    return { deleted: resultRetry.affected > 0 };
                }
                throw err;
            }
        } catch (err) {
            console.error('Error deleting volunteer:', err);
            throw new InternalServerErrorException('Failed to delete volunteer');
        }
    }
}
