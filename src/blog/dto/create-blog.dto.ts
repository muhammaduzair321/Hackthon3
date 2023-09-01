import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  // @IsNotEmpty()
  // @IsString()
  // shortDescription: string;

  @IsNotEmpty()
  @IsString()
  blogBody: string;
}
