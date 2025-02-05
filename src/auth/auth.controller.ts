import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Response as Res } from 'express';
import { Public } from './decorators/public.decorator';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() dto: SignInDto, @Response() response: Res) {
    const { access_token } = await this.authService.signIn(
      dto.email,
      dto.password,
    );
    return response.cookie('access_token', access_token).json({ access_token });
  }

  @Post('/register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.usersService.findOne(dto.email);

    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    return this.usersService.create(dto);
  }
}
