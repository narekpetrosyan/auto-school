import { IsArray, IsOptional, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ required: true, description: 'Option text' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: true, description: 'Right option ID' })
  @IsString()
  @IsNotEmpty()
  rightOptionId: string;

  @ApiProperty({
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        text: { type: 'string' },
      },
      required: ['text'],
    },
  })
  @IsOptional()
  @IsArray()
  options?: { id?: string; text: string }[];
}
