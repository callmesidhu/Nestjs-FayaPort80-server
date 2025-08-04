import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-events.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get('show')
  findAll() {
    return this.eventsService.findAll();
  }
}
