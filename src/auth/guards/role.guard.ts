import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { RoleTypes } from '../types/role';
import { ROLE_KEY } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleTypes[]>(
      ROLE_KEY,
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: { role: RoleTypes } }>();
    const user = request.user;
    return roles.some((role) => role === user.role);
  }
}
