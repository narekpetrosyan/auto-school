import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { OptionModule } from '../option/option.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const type = file.mimetype.split('/').at(-1);
          const filename = `${Date.now()}.${type}`;
          cb(null, filename);
        },
      }),
    }),
    OptionModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
