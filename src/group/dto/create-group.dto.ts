import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ required: true, description: 'Group name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @IsOptional()
  @IsArray()
  questionIds?: string[];
}
