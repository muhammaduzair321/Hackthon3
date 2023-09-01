import { IsNotEmpty, IsString } from 'class-validator';


export class CreateCategorylistDto {
    @IsNotEmpty()
    @IsString()
    category:string
}