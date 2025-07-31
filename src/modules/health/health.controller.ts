// src/modules/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('api/health')
export class HealthController {
  constructor(private dataSource: DataSource) {}

  @Get()
  async getHealth() {
    try {
      // Try database connection
      await this.dataSource.query('SELECT 1');
      return {
        status: 'success',
        message: 'Server is running and DB connected!',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server is running but DB connection failed',
        error: error.message,
      };
    }
  }
}
