import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Volunteer } from '../../volunteers/entities/volunteer.entity';
import { EmergencyPlanTask } from './emergency-plan-task.entity';

@Entity('emergency_plans')
export class EmergencyPlan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Volunteer, (v) => (v as any).plans, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'volunteer_id' })
    volunteer: Volunteer;

    @OneToMany(() => EmergencyPlanTask, (t) => t.plan, { cascade: true })
    tasks: EmergencyPlanTask[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
