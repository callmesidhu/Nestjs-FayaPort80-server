import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsDateString } from 'class-validator';

export class CreateEventDto {
        
  @ApiProperty()
  @IsString()
  port_uuid: string;

  @ApiProperty()
  @IsString()
  event_name: string;

  @ApiProperty()
  @IsString()
  event_description: string;

  @ApiProperty()
  @IsString()
  event_location: string;

  @ApiProperty()
  @IsString()
  event_time: string;

  @ApiProperty()
  @IsDateString()
  event_date: string;

  @ApiProperty()
  @IsUrl()
  event_poster_url: string;

  @ApiProperty()
  @IsUrl()
  video_url: string;

  @ApiProperty()
  @IsString()
  speaker_name: string;

  @ApiProperty()
  @IsString()
  speaker_description: string;

  @ApiProperty()
  @IsString()
  speaker_position: string;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsUrl()
  booking_url: string;
}
