import { RoleTypes } from '../../auth/types/role';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: RoleTypes })
  role: `${RoleTypes}`;
}
