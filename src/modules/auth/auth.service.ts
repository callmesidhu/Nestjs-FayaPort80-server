import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const admin = await this.adminRepo.findOne({ where: { email } });

    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.jwtService.signAsync(
      { sub: admin.id, email: admin.email },
      { expiresIn: '1d', secret: process.env.JWT_SECRET }
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: admin.id },
      { expiresIn: '7d', secret: process.env.JWT_SECRET }
    );

    return {
      message: 'Login successful',
      accessToken,
      refreshToken
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const admin = await this.adminRepo.findOne({ where: { id: payload.sub } });
      if (!admin) throw new UnauthorizedException();

      const newAccessToken = await this.jwtService.signAsync(
        { sub: admin.id, email: admin.email },
        { expiresIn: '1d', secret: process.env.JWT_SECRET }
      );

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async details(adminId: number) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new UnauthorizedException('User not found');

    return {
      user: {
        id: admin.id,
        email: admin.email,
        uuid: admin.uuid,
        port_uuid: admin.port_uuid,
      },
    };
  }
}
