import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Events')
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

  @UseGuards(JwtAuthGuard)
  @Put('edit/:id')
  @ApiParam({ name: 'id', type: 'string' })
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id') id: number) {
    return this.eventsService.remove(id);
  }
}
