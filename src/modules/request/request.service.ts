// src/modules/request/request.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestEntity } from './request.entity';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepo: Repository<RequestEntity>,
  ) {}

  async sendRequest(dto: CreateRequestDto) {
    const request = this.requestRepo.create(dto);
    return this.requestRepo.save(request);
  }

  async showAll() {
    return this.requestRepo.find();
  }
}
