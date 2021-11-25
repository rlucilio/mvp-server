import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  pass: string;
}
