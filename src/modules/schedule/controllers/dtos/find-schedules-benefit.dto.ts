import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindScheduleBenefitDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
