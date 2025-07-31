import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { HealthModule } from './modules/health/health.module';
import { RequestModule } from './modules/request/request.module';
import { LandingModule } from './modules/landing/landing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: typeOrmConfig }),
    HealthModule,
    RequestModule,
    LandingModule,
  ],
})
export class AppModule {}
