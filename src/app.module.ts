import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { HealthModule } from './modules/health/health.module';
import { RequestModule } from './modules/request/request.module';
import { LandingModule } from './modules/landing/landing.module';
import { AdminModule } from './modules/admin/admin.module';
import { PortsModule } from './modules/ports/ports.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: typeOrmConfig }),
    HealthModule,
    RequestModule,
    LandingModule,
    AdminModule,
    PortsModule,
    EventsModule,
  ],
})
export class AppModule {}
