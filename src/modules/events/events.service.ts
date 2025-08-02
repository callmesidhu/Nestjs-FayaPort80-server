import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Event } from './events.entity';
import { CreateEventDto } from './dto/create-events.dto';

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

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }
}
