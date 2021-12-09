import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSchedulesDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUUID()
  @IsNotEmpty()
  cod: string;
}
