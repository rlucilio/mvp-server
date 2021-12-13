import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class SetEmotionalDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  nps: number;
}
