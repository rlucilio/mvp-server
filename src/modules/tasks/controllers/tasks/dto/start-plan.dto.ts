import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class StartPlanDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;
}
