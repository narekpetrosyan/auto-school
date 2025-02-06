import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [SessionModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [],
})
export class UsersModule {}
