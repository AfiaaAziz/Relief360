import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('donations')
export class Donation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    donor: string;

    @Column({ nullable: true })
    donor_name: string;

    @Column({ default: 'Money' })
    type: string; // Money or Supply

    @Column({ nullable: true })
    amount: string; // formatted amount like "PKR 1000"

    @Column({ type: 'numeric', nullable: true })
    amount_value: number;

    @Column({ nullable: true })
    item: string; // for supply donations

    @Column({ type: 'int', nullable: true })
    quantity: number;

    @Column({ nullable: true })
    status: string;

    @CreateDateColumn()
    created_at: Date;
}
