import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Event } from './events.entity';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const event: Partial<Event> = {
      ...dto,
      uuid: uuidv4(), 
    };

    const entity = this.eventRepository.create(event);
    return this.eventRepository.save(entity);
  }

  async update(id: number, dto: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    Object.assign(event, dto);
    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<{ message: string }> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    await this.eventRepository.remove(event);
    return { message: 'Event deleted successfully' };
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }
}
