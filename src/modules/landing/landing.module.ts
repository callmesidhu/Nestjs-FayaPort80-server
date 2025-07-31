import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingEntity } from './landing.entity';
import { LandingService } from './landing.service';
import { LandingController } from './landing.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([LandingEntity]),
  ],
  controllers: [LandingController],
  providers: [LandingService],
})
export class LandingModule {}
