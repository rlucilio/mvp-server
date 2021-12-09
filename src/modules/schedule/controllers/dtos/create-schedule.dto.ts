import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSchedulesDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  cod: string;
}
