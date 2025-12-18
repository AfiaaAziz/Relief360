import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('hospital_registrations')
  export class Hospital {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    hospital_name: string;
  
    @Column({ nullable: true })
    hospital_type: string;
  
    @Column({ nullable: true })
    address: string;
  
    @Column({ nullable: true })
    phone: string;
  
    @Column({ nullable: true })
    emergency_phone: string;
  
    @Column()
    email: string;
  
    @Column({ type: 'int', nullable: true })
    total_beds: number;
  
    @Column({ type: 'int', nullable: true })
    icu_beds: number;
  
    @Column({ type: 'int', nullable: true })
    emergency_beds: number;
  
    @Column({ type: 'int', nullable: true })
    ambulances: number;
  
    @Column({ type: 'int', nullable: true })
    staff_count: number;
  
    @Column({ nullable: true })
    contact_name: string;
  
    @Column({ nullable: true })
    contact_position: string;
  
    @Column({ nullable: true })
    contact_phone: string;
  
    @Column({ nullable: true })
    contact_email: string;
  
    @Column({ type: 'text', nullable: true })
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
  
    @CreateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;
  
    @UpdateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;
  }
  