import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('requests')
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  organization: string;

  @Column()
  designation: string;

  @Column()
  domain: string;

  @Column()
  location: string;

  @Column({ type: 'text' })
  reason: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
