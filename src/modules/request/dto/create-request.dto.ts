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
  domain: string;

  @ApiProperty()
  location: string;

  @ApiProperty({ maxLength: 500 })
  reason: string;

  @ApiProperty()
  created_at: Date;
}
