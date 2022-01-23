import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
