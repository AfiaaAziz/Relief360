import { Injectable } from '@nestjs/common';
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
        // Check if volunteer already exists
        const existingVolunteer = await this.volunteersRepository.findOne({
            where: { email: createVolunteerDto.email },
        });
        if (existingVolunteer) {
            throw new Error('Volunteer with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(createVolunteerDto.password, 10);

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
        return this.volunteersRepository.save(volunteer);
    }

    async update(id: number, volunteerData: Partial<Volunteer>) {
        await this.volunteersRepository.update(id, volunteerData);
        return this.volunteersRepository.findOne({
            where: { id: id },
        });
    }


}
