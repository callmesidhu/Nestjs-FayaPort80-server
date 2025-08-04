import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-events.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {}
