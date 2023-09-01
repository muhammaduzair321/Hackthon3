import { Injectable } from '@nestjs/common';
import { CreateCategorylistDto } from './dto/create-categorylist.dto';
import { UpdateCategorylistDto } from './dto/update-categorylist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from 'src/models/CategoryModel';
import { Model } from 'mongoose';


@Injectable()
export class CategorylistService {
  constructor(@InjectModel(Category.name) private readonly CategoryModel:Model<CategoryDocument>){}


  async create(createCategorylistDto: CreateCategorylistDto):Promise<CategoryDocument> {
    const newCategory = new this.CategoryModel({
      ...createCategorylistDto
    })
    return newCategory.save();
  }

  findAll(): Promise<Category[]> {
    return this.CategoryModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} categorylist`;
  }

 async update(id: string, updateCategorylistDto: UpdateCategorylistDto) {
    try {
      const updatedCategory = await this.CategoryModel.findByIdAndUpdate(
        id,
        updateCategorylistDto,
        { new: true }, // To get the updated document
      );
    
      if (!updatedCategory) {
        throw new Error(`Category with id ${id} not found`);
      }
    
      return updatedCategory;
    } catch (error) {
  throw new Error(`Failed to update category: ${error.message}`);
      
    }
// console.log(updateCategorylistDto,"sadasdasd:::",id)
//     return `This action updates a #${id} categorylist`;
  }

  
  async remove(id: string) {
    try {
      const deletedCategory = await this.CategoryModel.deleteOne({_id: id});
      return { message: 'Category deleted successfully', category: deletedCategory };
    } catch (error) {
      return { message: 'Failed to delete category', error };
    }
  }
}

