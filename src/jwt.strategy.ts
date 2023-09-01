import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './models/UserModel';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "process.env.JWT_SECRET",
    });
  }
  async validate(payload: any) {
    const { id } = payload;
    console.log(id)
    const user = await this.UserModel.findById(id);
    if (!user) {
      throw new UnauthorizedException('Login first to access this page');
    }
    console.log('strategy', user);
    return user;
  }
}