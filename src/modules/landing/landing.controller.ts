import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LandingService } from './landing.service';
import { CreateLandingDto } from './dto/create-landing.dto';

@Controller('api/landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}

  @Post('add')
  addLanding(@Body() dto: CreateLandingDto) {
    return this.landingService.addLanding(dto);
  }

  @Get('show')
  showAll() {
    return this.landingService.showAll();
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.landingService.deleteLanding(Number(id));
  }
}
