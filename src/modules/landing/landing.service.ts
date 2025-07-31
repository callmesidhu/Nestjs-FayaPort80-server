import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandingEntity } from './landing.entity';
import { CreateLandingDto } from './dto/create-landing.dto';

@Injectable()
export class LandingService {
  constructor(
    @InjectRepository(LandingEntity)
    private readonly landingRepo: Repository<LandingEntity>,
  ) {}

  async addLanding(dto: CreateLandingDto) {
    const landing = this.landingRepo.create(dto);
    return this.landingRepo.save(landing);
  }

  async showAll() {
    return this.landingRepo.find();
  }

  async deleteLanding(id: number) {
    const result = await this.landingRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Landing with ID ${id} not found`);
    }
    return { message: 'Delete deleted successfully' };
  }
}
