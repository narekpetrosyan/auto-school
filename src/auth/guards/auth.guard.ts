import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { SessionService } from '../../session/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private sessionService: SessionService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: any }>();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const user = await this.jwtService
      .verifyAsync<{ id: string }>(token, {
        secret: this.configService.get('JWT_SECRET'),
      })
      .catch(() => {
        throw new UnauthorizedException('Token expired');
      });

    if (!(await this.sessionService.validateSession(token, user.id))) {
      throw new UnauthorizedException('Invalid session');
    }
    request['user'] = user;
    request['token'] = token;

    return true;
  }

  private extractTokenFromCookie(request: Request): string {
    return request.cookies['access_token'] as string;
  }
}
