import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto, LoginUserDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}

export class UpdateLoginDto extends PartialType(LoginUserDto){}
