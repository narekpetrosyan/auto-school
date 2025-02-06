import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private readonly prismaService: PrismaService) {}

  createSession(dto: CreateSessionDto) {
    return this.prismaService.session.create({
      data: {
        sessionToken: dto.sessionToken,
        userId: dto.userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
  }

  deleteSession(sessionToken: string) {
    return this.prismaService.session.deleteMany({ where: { sessionToken } });
  }

  async validateSession(sessionToken: string, userId: string) {
    const session = await this.prismaService.session.findUnique({
      where: {
        sessionToken,
        userId,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
    return !!session;
  }
}
