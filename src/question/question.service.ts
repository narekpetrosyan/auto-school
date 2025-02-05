import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  create(createQuestionDto: CreateQuestionDto & { filePath: string }) {
    return this.prismaService.question.create({
      data: {
        text: createQuestionDto.text,
        image: createQuestionDto.filePath,
        rightOption: {
          connect: { id: createQuestionDto.rightOptionId },
        },
        options: {
          connect: [
            {
              id: createQuestionDto.rightOptionId,
            },
          ],
        },
      },
      omit: {
        rightOptionId: true,
      },
      include: {
        rightOption: true,
        options: true,
      },
    });
  }

  findAll() {
    return this.prismaService.question.findMany({
      omit: {
        rightOptionId: true,
      },
      include: {
        rightOption: true,
        options: true,
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} question`;
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: string) {
    return `This action removes a #${id} question`;
  }
}
