import { RoleTypes } from '../../auth/types/role';

export interface UserOutput {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: `${RoleTypes}`;
}
