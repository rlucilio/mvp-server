import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  mail: string;

  pass: string;

  @IsBoolean()
  @IsNotEmpty()
  firstAccess: boolean;
}
