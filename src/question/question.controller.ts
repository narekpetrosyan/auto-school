import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTypePipe } from '../pipes/file-type.pipe';
import { FileSizePipe } from '../pipes/file-size.pipe';
import { DeleteFileOnErrorFilter } from '../exceptions/delete-file-on-error.exception';
import { Role } from '../auth/decorators/role.decorator';
import { RoleTypes } from '../auth/types/role';

@Controller({
  path: 'questions',
})
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @Role(RoleTypes.ADMIN)
  @UseFilters(DeleteFileOnErrorFilter)
  create(
    @Body() createQuestionDto: CreateQuestionDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileSizePipe({ maxSize: 1000000 }),
          new FileTypePipe({ fileType: new RegExp(/(jpg|jpeg|png)$/) }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const filePath = file.path;
    return this.questionService.create({
      ...createQuestionDto,
      filePath,
    });
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
