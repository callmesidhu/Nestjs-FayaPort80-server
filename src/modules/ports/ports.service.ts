import { v4 as uuidv4 } from 'uuid';
import { Port } from './ports.entity';
import { CreatePortDto } from './dto/create-port.dto';
import { UpdatePortDto } from './dto/update-port.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PortsService {
  constructor(
    @InjectRepository(Port)
    private readonly portRepo: Repository<Port>,
  ) {}

  // Create new port
  async create(dto: CreatePortDto): Promise<Port> {
    const port: Partial<Port> = {
      ...dto,
      uuid: uuidv4(),
    };

    const entity = this.portRepo.create(port);
    return this.portRepo.save(entity);
  }

  async update(id: number, dto: UpdatePortDto): Promise<Port> {
    const port = await this.portRepo.findOne({ where: { id } });
    if (!port) throw new NotFoundException('Port not found');
    Object.assign(port, dto);
    return this.portRepo.save(port);
  }

  async remove(id: number): Promise<{ message: string }> {
    const port = await this.portRepo.findOne({ where: { id } });
    if (!port) throw new NotFoundException('Port not found');
    await this.portRepo.remove(port);
    return { message: 'Port deleted successfully' };
  }

  async findAll(): Promise<Port[]> {
    return this.portRepo.find();
  }
}
