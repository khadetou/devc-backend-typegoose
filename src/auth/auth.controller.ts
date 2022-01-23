import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(createUserDto);
  }

  @Post('signIn')
  async signIn(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(loginUserDto);
  }
}
