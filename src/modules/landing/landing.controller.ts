import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req
} from '@nestjs/common';
import { LandingService } from './landing.service';
import { CreateLandingDto } from './dto/create-landing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Request } from 'express';
import type { Express } from 'express';


@ApiTags('Landing')
@Controller('api/landing')
export class LandingController {
  constructor(private readonly landingService: LandingService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('add')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './storage', // folder where images are stored
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )

 async addLanding(
  @Body() dto: CreateLandingDto,
  @UploadedFile() file: Express.Multer.File,
  @Req() req: Request
) {
  const imageUrl = `${req.protocol}://${req.get('host')}/storage/${file.filename}`;
  return this.landingService.addLanding({
    ...dto,
    image_url: imageUrl,
  });
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
