import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { HospitalsService } from '../modules/hospitals/hospitals.service';

async function seedHospitals() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const hospitalsService = app.get(HospitalsService);

    // Sample hospital data
    const sampleHospitals = [
        {
            hospital_name: 'Central Medical Center',
            hospital_type: 'General Hospital',
            address: 'Downtown District',
            phone: '+1 (555) 123-4567',
            emergency_phone: '+1 (555) 123-4568',
            email: 'contact@centralmed.com',
            total_beds: 450,
            icu_beds: 45,
            emergency_beds: 25,
            ambulances: 10,
            staff_count: 200,
            contact_name: 'Dr. Sarah Johnson',
            contact_position: 'Chief Medical Officer',
            contact_phone: '+1 (555) 123-4569',
            contact_email: 'sarah.johnson@centralmed.com',
            additional_info: '24/7 emergency services available',
            services: ['Trauma Center', 'Cardiac Care', 'Emergency Surgery'],
            terms: true,
            data_sharing: true,
            status: 'approved',
            password_hash: '$2b$10$dummy.hash.for.sample.data',
        },
        {
            hospital_name: 'Regional Trauma Hospital',
            hospital_type: 'Specialty Hospital',
            address: 'North District',
            phone: '+1 (555) 987-6543',
            emergency_phone: '+1 (555) 987-6544',
            email: 'contact@regionaltrauma.com',
            total_beds: 280,
            icu_beds: 30,
            emergency_beds: 15,
            ambulances: 8,
            staff_count: 150,
            contact_name: 'Dr. Michael Chen',
            contact_position: 'Trauma Director',
            contact_phone: '+1 (555) 987-6545',
            contact_email: 'michael.chen@regionaltrauma.com',
            additional_info: 'Level 1 Trauma Center',
            services: ['Level 1 Trauma', 'Neurosurgery', 'Burns Unit'],
            terms: true,
            data_sharing: true,
            status: 'approved',
            password_hash: '$2b$10$dummy.hash.for.sample.data',
        },
    ];

    try {
        for (const hospitalData of sampleHospitals) {
            await hospitalsService.createBasic(hospitalData);
            console.log(`Created hospital: ${hospitalData.hospital_name}`);
        }
        console.log('Sample hospitals seeded successfully!');
    } catch (error) {
        console.error('Error seeding hospitals:', error);
    } finally {
        await app.close();
    }
}

seedHospitals();
