// src/modules/request/dto/create-request.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  organization: string;

  @ApiProperty()
  designation: string;

  @ApiProperty()
  niche: string;

  @ApiProperty()
  location: string;

  @ApiProperty({ maxLength: 300 })
  reason: string;
}
