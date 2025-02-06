import { IsArray, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  rightOptionId: string;

  @IsOptional()
  @IsArray()
  options?: { id?: string; text: string }[];
}
