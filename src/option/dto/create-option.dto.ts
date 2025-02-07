import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto {
  @ApiProperty({ description: 'Option text' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
