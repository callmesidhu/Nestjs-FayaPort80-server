// src/modules/request/request.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity])],
  providers: [RequestService],
  controllers: [RequestController],
})
export class RequestModule {}
