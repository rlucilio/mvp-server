import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AddTaskInPlanDto {
  @IsNotEmpty()
  @IsMongoId()
  task: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  expected: number | boolean;

  @IsString()
  @IsNotEmpty()
  date: string;
}
