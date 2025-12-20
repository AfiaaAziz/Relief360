import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { VolunteersModule } from './modules/volunteers/volunteers.module';
import { HospitalsModule } from './modules/hospitals/hospitals.module';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { ContactModule } from './modules/contact/contact.module';
import { DonationsModule } from './modules/donations/donations.module';
import { CitizensModule } from './modules/citizens/citizens.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { User } from './modules/auth/entities/user.entity';
import { Volunteer } from './modules/volunteers/entities/volunteer.entity';
import { Hospital } from './modules/hospitals/entities/hospital.entity';
import { Incident } from './modules/incidents/entities/incident.entity';
import { VolunteerAssignment } from './modules/incidents/entities/volunteer-assignment.entity';
import { ContactMessage } from './modules/contact/entities/contact-message.entity';
import { Citizen } from './modules/citizens/entities/citizen.entity';
import { Feedback } from './modules/feedback/entities/feedback.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOST || 'localhost',
            port: parseInt(process.env.PG_PORT) || 5432,
            database: process.env.PG_DATABASE || 'relief360',
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            entities: [User, Volunteer, Hospital, Incident, VolunteerAssignment, ContactMessage, require('./modules/donations/entities/donation.entity').Donation, Citizen, Feedback],
            synchronize: false, // Disabled - use migrations instead to avoid NULL value conflicts
            logging: process.env.NODE_ENV === 'development',
        }),
        AuthModule,
        VolunteersModule,
        HospitalsModule,
        IncidentsModule,
        ContactModule,
        DonationsModule,
        CitizensModule,
        FeedbackModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
