import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto, LoginUserDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/UserModel';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}


  // create user
  async create(createAuthDto: CreateAuthDto): Promise<User> {
    const { email, password } = createAuthDto;
    console.log(' email', email);
    // Check if a user with the same email already exists
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      // If a user with the same email exists, throw a ConflictException
      throw new ConflictException('Username or email already exists');
    }
    // If no existing user is found, create and save the new user
    //  const newUser = new this.userModel(createAuthDto);
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    console.log('hashedPassword', hashedPassword);
    const newUser = new this.userModel({
      ...createAuthDto,
      password: hashedPassword, // Store the hashed password
    });
    return newUser.save();
    // return 'This action adds a new auth';
  }


  // login user by match eial and password
  async loginUserAuth(loginUserDto: LoginUserDto): Promise<User|any> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new ConflictException('User not found'); // User not found
    }
    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password'); // Password doesn't match
    }

    const payload = { id: user._id };
    return {
      access_token: this.jwtService.sign(payload),// Return token
      user,// Return User 
    };

    // return user; 
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
