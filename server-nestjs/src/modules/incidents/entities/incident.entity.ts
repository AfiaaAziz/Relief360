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
    incident_id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column()
    incident_type: string;

    @Column({
        type: 'enum',
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium',
    })
    severity: string;

    @Column({
        type: 'enum',
        enum: ['reported', 'in_progress', 'resolved'],
        default: 'reported',
    })
    status: string;

    @Column({ nullable: true })
    reported_by_user_id: number;

    @Column({ nullable: true })
    assigned_volunteer_id: number;

    @Column({ nullable: true })
    assigned_hospital_id: number;

    @CreateDateColumn()
    reported_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
