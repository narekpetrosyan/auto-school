import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OptionService {
  constructor(private prismaService: PrismaService) {}

  create(data: CreateOptionDto) {
    return this.prismaService.option.create({ data });
  }

  findAll() {
    return this.prismaService.option.findMany();
  }

  findOne(id: string) {
    return this.prismaService.option.findFirst({ where: { id } });
  }

  update(id: string, data: UpdateOptionDto) {
    return `This action updates a #${id} option`;
  }

  remove(id: string) {
    return `This action removes a #${id} option`;
  }
}
