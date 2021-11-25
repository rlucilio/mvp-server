import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  newPass: string;
}
