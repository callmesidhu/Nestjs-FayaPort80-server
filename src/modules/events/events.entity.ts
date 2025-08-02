import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  port_uuid: string;

  @Column()
  event_name: string;

  @Column('text')
  event_description: string;

  @Column()
  event_location: string;

  @Column()
  event_time: string;

  @Column({ type: 'date' })
  event_date: string;

  @Column('text')
  event_poster_url: string;

  @Column('text')
  video_url: string;

  @Column()
  speaker_name: string;

  @Column('text')
  speaker_description: string;

  @Column()
  speaker_position: string;

  @Column()
  company: string;

  @Column('text')
  booking_url: string;
}
