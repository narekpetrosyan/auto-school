import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './question/question.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { envSchema } from './schemas/env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: envSchema,
    }),
    PrismaModule,
    QuestionModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
