import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('contactus')
export class ContactMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    department: string;

    @Column({ nullable: true })
    subject: string;

    @Column('text')
    message: string;

    @Column({ default: 'medium' })
    priority: string;

    @Column({ default: 'pending' })
    status: string;

    @CreateDateColumn()
    created_at: Date;
}
