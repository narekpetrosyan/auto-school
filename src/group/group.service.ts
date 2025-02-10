import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prismaService: PrismaService) {}

  create(createGroupDto: CreateGroupDto) {
    const { name, questionIds } = createGroupDto;
    return this.prismaService.group.create({
      data: {
        name: name,
        ...(questionIds
          ? {
              questions: {
                connect: questionIds.map((questionId) => ({
                  id: questionId,
                })),
              },
            }
          : {}),
      },
      include: {
        questions: {
          include: {
            options: true,
            rightOption: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.group.findMany({
      include: {
        questions: {
          include: {
            options: true,
            rightOption: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.group.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
            rightOption: true,
          },
        },
      },
    });
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    const { name, questionIds } = updateGroupDto;

    return this.prismaService.group.update({
      where: { id },
      data: {
        name: name,
        ...(questionIds
          ? {
              questions: {
                connect: questionIds.map((questionId) => ({
                  id: questionId,
                })),
              },
            }
          : {}),
      },
      include: {
        questions: {
          include: {
            options: true,
            rightOption: true,
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prismaService.group.delete({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
            rightOption: true,
          },
        },
      },
    });
  }
}
