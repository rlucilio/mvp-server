import { IsDateString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBenefitDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  dateBirth: string;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;
}
