import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Role } from '../auth/decorators/role.decorator';
import { RoleTypes } from '../auth/types/role';

@Controller({
  path: 'options',
})
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  @Role(RoleTypes.ADMIN)
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get()
  findAll() {
    return this.optionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionService.findOne(id);
  }

  @Patch(':id')
  @Role(RoleTypes.ADMIN)
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.update(id, updateOptionDto);
  }

  @Delete(':id')
  @Role(RoleTypes.ADMIN)
  remove(@Param('id') id: string) {
    return this.optionService.remove(id);
  }
}
