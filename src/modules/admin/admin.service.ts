import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { SignupAdminDto } from './dto/signup-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async signup(dto: SignupAdminDto): Promise<Admin> {
    const exists = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new ConflictException('Email already exists');
    }
    const admin = this.adminRepo.create(dto);
    return this.adminRepo.save(admin);
  }
}
