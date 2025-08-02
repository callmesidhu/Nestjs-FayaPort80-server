import { Controller, Post, Body, Get } from '@nestjs/common';
import { PortsService } from './ports.service';
import { CreatePortDto } from './dto/create-port.dto';

@Controller('api/ports')
export class PortsController {
  constructor(private readonly portsService: PortsService) {}

  @Post('add')
  async create(@Body() dto: CreatePortDto) {
    return this.portsService.create(dto);
  }

  @Get('show')
  async getAll() {
    return this.portsService.findAll();
  }
}
