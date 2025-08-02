import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortsController } from './ports.controller';
import { PortsService } from './ports.service';
import { Port } from './ports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Port])],
  controllers: [PortsController],
  providers: [PortsService],
})
export class PortsModule {}
