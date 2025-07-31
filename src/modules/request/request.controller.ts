import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Requests')
@Controller('api/request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('send')
  send(@Body() dto: CreateRequestDto) {
    return this.requestService.sendRequest(dto);
  }

  @Get('show')
  show() {
    return this.requestService.showAll();
  }
}
