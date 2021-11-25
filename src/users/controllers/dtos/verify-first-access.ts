import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyFirstAccessDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
