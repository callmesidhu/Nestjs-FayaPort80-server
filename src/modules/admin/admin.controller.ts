import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupAdminDto } from './dto/signup-admin.dto';

@Controller('api/auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  signup(@Body() dto: SignupAdminDto) {
    return this.adminService.signup(dto);
  }
}
