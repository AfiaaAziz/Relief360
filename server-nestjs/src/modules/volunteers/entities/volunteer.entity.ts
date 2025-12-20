import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('volunteers')
export class Volunteer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    age: string;

    @Column()
    availability: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    experience: string;

    @Column()
    motivation: string;

    @Column({ default: false })
    terms_accepted: boolean;

    @Column({ default: false })
    background_check: boolean;

    @Column('text', { array: true, nullable: true })
    skills: string[];

    @Column({ default: false })
    assigned: boolean;

    @Column()
    password_hash: string;



    @CreateDateColumn()
    created_at: Date;

    // One-to-many relation to emergency plans
    // Note: import is dynamic to avoid circular dependency issues at file load time in some environments
    // We'll add the relation at runtime via a function to keep entities clean
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    plans?: any[];
}
