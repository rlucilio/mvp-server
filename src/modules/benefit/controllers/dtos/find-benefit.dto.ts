import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindBenefitDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
