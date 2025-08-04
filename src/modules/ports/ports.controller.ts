import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { PortsService } from './ports.service';
import { CreatePortDto } from './dto/create-port.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/ports')
export class PortsController {
  constructor(private readonly portsService: PortsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async create(@Body() dto: CreatePortDto) {
    return this.portsService.create(dto);
  }

  @Get('show')
  async getAll() {
    return this.portsService.findAll();
  }
}
