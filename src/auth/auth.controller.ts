import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
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
  async signIn(@Body() dto: SignInDto, @Res() response: Response) {
    const { access_token } = await this.authService.signIn(
      dto.email,
      dto.password,
    );
    return response.cookie('access_token', access_token).json({ access_token });
  }

  @Public()
  @Post('/register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.usersService.findOne(dto.email);

    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    return this.usersService.create(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Req() request: Request & { token: string },
    @Res() response: Response,
  ) {
    await this.authService.signOut(request.token);

    return response
      .clearCookie('access_token')
      .json({ message: 'Logged out successfully' });
  }
}
