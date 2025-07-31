import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('landings')
export class LandingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image_url: string;
}
