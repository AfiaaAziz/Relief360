import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { EmergencyPlan } from './emergency-plan.entity';

@Entity('emergency_plan_tasks')
export class EmergencyPlanTask {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => EmergencyPlan, (p) => p.tasks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'plan_id' })
    plan: EmergencyPlan;

    @Column('text')
    title: string;

    @Column({ default: false })
    completed: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
