import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Volunteer } from '../../volunteers/entities/volunteer.entity';
import { Incident } from './incident.entity';

@Entity('volunteer_assignments')
export class VolunteerAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    volunteer_id: number;

    @Column()
    incident_id: number;

    @CreateDateColumn()
    assigned_at: Date;

    @Column({ default: 'assigned' })
    status: string;

    @Column({ nullable: true })
    notes: string;

    @ManyToOne(() => Volunteer)
    @JoinColumn({ name: 'volunteer_id' })
    volunteer: Volunteer;

    @ManyToOne(() => Incident)
    @JoinColumn({ name: 'incident_id' })
    incident: Incident;
}
