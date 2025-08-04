import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LandingService } from './landing.service';
import { CreateLandingDto } from './dto/create-landing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Landing')
@Controller('api/landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  addLanding(@Body() dto: CreateLandingDto) {
    return this.landingService.addLanding(dto);
  }

  @Get('show')
  showAll() {
    return this.landingService.showAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.landingService.deleteLanding(Number(id));
  }
}
