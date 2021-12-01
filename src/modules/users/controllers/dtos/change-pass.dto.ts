import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  newPass: string;

  @IsString()
  @IsNotEmpty()
  oldPass: string;
}
