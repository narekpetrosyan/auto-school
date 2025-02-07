import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true, description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, description: 'User firstName' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true, description: 'User lastName' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: true, description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
