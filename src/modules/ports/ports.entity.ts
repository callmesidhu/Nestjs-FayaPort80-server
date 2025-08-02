import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ports')
export class Port {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  uuid: string;

  @Column()
  port_name: string;

  @Column()
  port_description: string;

  @Column()
  port_email: string;

  @Column()
  location: string;

  @Column()
  domain: string;
}
