import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestChangePassDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
