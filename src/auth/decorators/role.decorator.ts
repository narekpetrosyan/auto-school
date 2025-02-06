import { SetMetadata } from '@nestjs/common';
import { RoleTypes } from '../types/role';

export const ROLE_KEY = 'role';
export const Role = (...roles: `${RoleTypes}`[]) =>
  SetMetadata(ROLE_KEY, roles);
