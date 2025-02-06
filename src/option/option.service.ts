import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OptionService {
  constructor(private prismaService: PrismaService) {}

  create(createOptionDto: CreateOptionDto) {
    return 'This action adds a new option';
  }

  findAll() {
    return `This action returns all option`;
  }

  findOne(id: string) {
    return this.prismaService.option.findFirst({ where: { id } });
  }

  update(id: string, updateOptionDto: UpdateOptionDto) {
    return `This action updates a #${id} option`;
  }

  remove(id: string) {
    return `This action removes a #${id} option`;
  }
}
