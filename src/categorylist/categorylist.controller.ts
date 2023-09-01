import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategorylistService } from './categorylist.service';
import { CreateCategorylistDto } from './dto/create-categorylist.dto';
import { UpdateCategorylistDto } from './dto/update-categorylist.dto';
import { AuthGuard } from '@nestjs/passport';
import { Category } from 'src/models/CategoryModel';



@Controller('categorylist')
export class CategorylistController {
  constructor(private readonly categorylistService: CategorylistService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createCategorylistDto: CreateCategorylistDto) {
    return this.categorylistService.create(createCategorylistDto);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categorylistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorylistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategorylistDto: UpdateCategorylistDto) {
    return this.categorylistService.update(id, updateCategorylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorylistService.remove(id);
  }
}
