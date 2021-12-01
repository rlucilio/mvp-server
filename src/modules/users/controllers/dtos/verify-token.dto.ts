import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyTokenDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
