import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        signOptions: {
          expiresIn: `${new Date(Date.now() + 1000 * 60 * 60 * 24).getMinutes()}m`,
        },
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    SessionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
