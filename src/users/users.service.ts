import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserOutput } from './types/user.types';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findOne(email: string): Promise<UserOutput | null> {
    return this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async create(dto: CreateUserDto): Promise<Omit<UserOutput, 'password'>> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prismaService.user.create({
      data: { ...dto, password: hashedPassword },
      omit: {
        password: true,
      },
    });
  }
}
