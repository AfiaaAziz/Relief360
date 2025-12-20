import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('incidents')
export class Incident {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column({
        type: 'enum',
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium',
    })
    severity: string;

    @Column({
        type: 'enum',
        enum: ['pending', 'in_progress', 'resolved'],
        default: 'pending',
    })
    status: string;

    @Column('text', { array: true, nullable: true })
    required_skills: string[];

    @Column({ nullable: true })
    estimated_duration: string;

    @Column({ nullable: true })
    contact_person: string;

    @Column({ nullable: true })
    contact_phone: string;

    @Column({ nullable: true })
    reported_by_user_id: number;

    @Column({ nullable: true })
    reported_by_email: string;

    @Column('text', { nullable: true })
    media_files: string; // JSON string of uploaded file information

    @Column({ nullable: true })
    assigned_volunteer_id: number;

    @Column({ nullable: true })
    assigned_hospital_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
