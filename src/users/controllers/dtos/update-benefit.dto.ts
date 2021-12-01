import { IsDateString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBenefitDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  dateBirth: Date;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;
}
