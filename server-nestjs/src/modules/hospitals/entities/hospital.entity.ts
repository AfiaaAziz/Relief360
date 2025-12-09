import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('hospital_registrations')
export class Hospital {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hospital_name: string;

    @Column()
    hospital_type: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    emergency_phone: string;

    @Column()
    email: string;

    @Column()
    total_beds: number;

    @Column()
    icu_beds: number;

    @Column()
    emergency_beds: number;

    @Column({ nullable: true })
    ambulances: number;

    @Column()
    staff_count: number;

    @Column()
    contact_name: string;

    @Column()
    contact_position: string;

    @Column()
    contact_phone: string;

    @Column()
    contact_email: string;

    @Column({ nullable: true })
    additional_info: string;

    @Column('text', { array: true, nullable: true })
    services: string[];

    @Column({ default: false })
    terms: boolean;

    @Column({ default: false })
    data_sharing: boolean;

    @Column({ default: 'pending' })
    status: string;

    @Column()
    password_hash: string;



    @CreateDateColumn()
    created_at: Date;
}
