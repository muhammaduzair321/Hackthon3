import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorylistDto } from './create-categorylist.dto';

export class UpdateCategorylistDto extends PartialType(CreateCategorylistDto) {}
