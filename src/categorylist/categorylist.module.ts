import { Module } from '@nestjs/common';
import { CategorylistService } from './categorylist.service';
import { CategorylistController } from './categorylist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/models/CategoryModel';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Category.name,schema:CategorySchema}]),
    AuthModule
  ],
  controllers: [CategorylistController],
  providers: [CategorylistService],
})
export class CategorylistModule {}