import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OptionService } from '../option/option.service';

@Injectable()
export class QuestionService {
  constructor(
    private prismaService: PrismaService,
    private optionService: OptionService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto & { filePath: string }) {
    const option = await this.optionService.findOne(
      createQuestionDto.rightOptionId,
    );

    if (!option) {
      throw new NotFoundException('Option not found');
    }

    return this.prismaService.question.create({
      data: {
        text: createQuestionDto.text,
        image: createQuestionDto.filePath,
        rightOption: {
          connect: { id: option.id },
        },
        options: {
          ...(createQuestionDto.options && {
            create: createQuestionDto.options
              .filter((el) => !el.id)
              .map((opt) => ({
                text: opt.text,
              })),
            connect: [
              ...createQuestionDto.options.filter((el) => !!el.id),
              { id: option.id },
            ].map((opt) => ({
              id: opt.id,
            })),
          }),
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
    return this.prismaService.question.findUnique({ where: { id } });
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const { text, options, rightOptionId } = updateQuestionDto;

    return this.prismaService.question.update({
      where: { id },
      data: {
        text,
        rightOption: {
          connect: { id: rightOptionId },
        },
        options: {
          ...(options && {
            create: options
              .filter((el) => !el.id)
              .map((opt) => ({
                text: opt.text,
              })),
            connect: [
              ...options.filter((el) => !!el.id),
              { id: rightOptionId },
            ].map((opt) => ({
              id: opt.id,
            })),
          }),
        },
      },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} question`;
  }
}
