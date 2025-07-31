// src/modules/request/request.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('requests')
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  organization: string;

  @Column()
  designation: string;

  @Column()
  niche: string;

  @Column()
  location: string;

  @Column({ type: 'text' })
  reason: string;
}
