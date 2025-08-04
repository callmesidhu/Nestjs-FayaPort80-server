import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupAdminDto } from './dto/signup-admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

 // @UseGuards(JwtAuthGuard)
  @Post('signup')
  signup(@Body() dto: SignupAdminDto) {
    return this.adminService.signup(dto);
  }
}
