import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ required: true, description: 'User email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
