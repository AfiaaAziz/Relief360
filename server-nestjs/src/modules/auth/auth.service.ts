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
        const userPayload: any = {
            id: account.id,
            email: account.email,
            role: role,
        };
        // If the account is a citizen or volunteer, include name fields
        if (role === 'citizen' || role === 'volunteer') {
            userPayload.firstName = (account as any).first_name;
            userPayload.lastName = (account as any).last_name;
        }

        // If the account is a volunteer, include additional volunteer profile fields
        if (role === 'volunteer') {
            userPayload.phone = (account as any).phone;
            userPayload.skills = (account as any).skills || [];
            userPayload.experience = (account as any).experience;
            userPayload.address = (account as any).address;
            userPayload.availability = (account as any).availability;
            // boolean convenience property for frontend toggles
            const avail = (account as any).availability;
            userPayload.available = typeof avail === 'string' ? avail.toLowerCase().includes('avail') : !!avail;
        }

        return {
            token,
            user: userPayload,
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

    async validateUser(userId: string | number) {
        // Handle admin user
        if (userId === 'admin' || userId === 'admin@gmail.com') {
            return {
                id: 'admin',
                email: 'admin@relief360.local',
                role: 'admin',
            };
        }

        // Convert to number for database lookup
        const numericId = typeof userId === 'string' ? parseInt(userId, 10) : userId;

        if (isNaN(numericId)) {
            throw new UnauthorizedException('Invalid user ID');
        }

        // First check volunteers table
        let account: Volunteer | Hospital | Citizen | null = await this.volunteersRepository.findOne({
            where: { id: numericId },
        });

        let role = 'volunteer';

        // If not found in volunteers, check hospitals table
        if (!account) {
            account = await this.hospitalsRepository.findOne({
                where: { id: numericId },
            });
            role = 'hospital';
        }

        // If not found in hospitals, check citizens table
        if (!account) {
            account = await this.citizensRepository.findOne({
                where: { id: numericId },
            });
            role = 'citizen';
        }

        // If not found in any table
        if (!account) {
            throw new UnauthorizedException('User not found');
        }

        const resultPayload: any = {
            id: account.id,
            email: account.email,
            role: role,
        };

        if (role === 'citizen' || role === 'volunteer') {
            resultPayload.firstName = (account as any).first_name;
            resultPayload.lastName = (account as any).last_name;
        }

        if (role === 'volunteer') {
            resultPayload.phone = (account as any).phone;
            resultPayload.skills = (account as any).skills || [];
            resultPayload.experience = (account as any).experience;
            resultPayload.address = (account as any).address;
            resultPayload.availability = (account as any).availability;
            const avail = (account as any).availability;
            resultPayload.available = typeof avail === 'string' ? avail.toLowerCase().includes('avail') : !!avail;
        }

        return resultPayload;
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
