import { JwtPayload } from './../../node_modules/@nestjs/jwt/node_modules/@types/jsonwebtoken/index.d';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from './user.model';
import { url } from 'gravatar';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}

  //Create user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    let user = await this.userModel.findOne({ email });

    if (!user) {
      //Hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      user = new this.userModel({
        name,
        avatar:
          url &&
          url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
          }),
        email,
        password: hashPassword,
      });
    } else {
      throw new ConflictException('User already exists');
    }
    try {
      return await user.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  //Login - SignIn -Authenticate user
  async signIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { email, password } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
