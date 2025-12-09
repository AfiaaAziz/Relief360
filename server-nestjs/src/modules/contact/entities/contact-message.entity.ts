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

    @Column()
    department: string;

    @Column()
    subject: string;

    @Column('text')
    message: string;

    @Column({ default: 'medium' })
    priority: string;

    @CreateDateColumn()
    created_at: Date;
}
