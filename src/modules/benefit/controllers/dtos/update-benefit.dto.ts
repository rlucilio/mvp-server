import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBenefitDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  dateBirth: string;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;
}
