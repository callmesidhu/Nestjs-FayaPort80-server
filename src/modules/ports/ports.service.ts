import { v4 as uuidv4 } from 'uuid';
import { Port } from './ports.entity';
import { CreatePortDto } from './dto/create-port.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PortsService {
  constructor(
    @InjectRepository(Port)
    private readonly portRepo: Repository<Port>,
  ) {}

  async create(dto: CreatePortDto): Promise<Port> {
    const port: Partial<Port> = {
      ...dto,
      uuid: uuidv4(), //
    };

    const entity = this.portRepo.create(port);
    return this.portRepo.save(entity);
  }

  async findAll(): Promise<Port[]> {
    return this.portRepo.find();
  }
}
