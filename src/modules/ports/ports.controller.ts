import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PortsService } from './ports.service';
import { CreatePortDto } from './dto/create-port.dto';
import { UpdatePortDto } from './dto/update-port.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Ports')
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


  @UseGuards(JwtAuthGuard)
  @Put('edit/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async update(@Param('id') id: number, @Body() dto: UpdatePortDto) {
    return this.portsService.update(id, dto);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async delete(@Param('id') id: number) {
    return this.portsService.remove(id);
  }
}
