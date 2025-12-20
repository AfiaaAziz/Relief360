import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Volunteer } from '../volunteers/entities/volunteer.entity';
import { Hospital } from '../hospitals/entities/hospital.entity';
import { Citizen } from '../citizens/entities/citizen.entity';
import { LoginDto } from './dto/login.dto';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Volunteer)
        private volunteersRepository: Repository<Volunteer>,
        @InjectRepository(Hospital)
        private hospitalsRepository: Repository<Hospital>,
        @InjectRepository(Citizen)
        private citizensRepository: Repository<Citizen>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async login(loginDto: LoginDto) {
        const { email, password, role: requestedRole } = loginDto;

        // First check volunteers table
        let account: Volunteer | Hospital | Citizen | null = await this.volunteersRepository.findOne({
            where: { email },
        });

        let role = 'volunteer';

        // If not found in volunteers, check hospitals table
        if (!account) {
            account = await this.hospitalsRepository.findOne({
                where: { email },
            });
            role = 'hospital';
        }

        // If not found in hospitals, check citizens table
        if (!account) {
            account = await this.citizensRepository.findOne({
                where: { email },
            });
            role = 'citizen';
        }

        // If not found in any table
        if (!account) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, account.password_hash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Validate role if provided - user must match the selected role
        if (requestedRole && requestedRole !== role) {
            throw new BadRequestException(
                `The email you entered is registered as ${role}, not ${requestedRole}. Please select the correct account type or use the correct email.`
            );
        }

        const token = this.generateTokenForAccount(account, role);
        return {
            token,
            user: {
                id: account.id,
                email: account.email,
                role: role,
            },
        };
    }

    async adminLogin(adminLoginDto: AdminLoginDto) {
        const { username, password } = adminLoginDto;

        // Static admin credentials
        const adminUsername = 'admin@gmail.com';
        const adminPassword = 'admin123';

        if (username !== adminUsername || password !== adminPassword) {
            throw new UnauthorizedException('Invalid admin credentials');
        }

        const payload = {
            id: 'admin',
            email: 'admin@relief360.local',
            role: 'admin',
        };

        const token = this.jwtService.sign(payload, {
            expiresIn: 604800, // 7 days in seconds
        });

        return {
            token,
            user: {
                id: 'admin',
                email: 'admin',
                role: 'admin',
            },
        };
    }

    async validateUser(userId: number) {
        // First check volunteers table
        let account: Volunteer | Hospital | Citizen | null = await this.volunteersRepository.findOne({
            where: { id: userId },
        });

        let role = 'volunteer';

        // If not found in volunteers, check hospitals table
        if (!account) {
            account = await this.hospitalsRepository.findOne({
                where: { id: userId },
            });
            role = 'hospital';
        }

        // If not found in hospitals, check citizens table
        if (!account) {
            account = await this.citizensRepository.findOne({
                where: { id: userId },
            });
            role = 'citizen';
        }

        // If not found in any table
        if (!account) {
            throw new UnauthorizedException('User not found');
        }

        return {
            id: account.id,
            email: account.email,
            role: role,
        };
    }

    private generateTokenForAccount(account: Volunteer | Hospital | Citizen, role: string) {
        const payload = {
            id: account.id,
            email: account.email,
            role: role,
        };

        return this.jwtService.sign(payload, {
            expiresIn: 604800, // 7 days in seconds
        });
    }
}
