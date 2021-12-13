import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';

export class AddTaskInPlanDto {
  @IsNotEmpty()
  @IsMongoId()
  task: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  expected: number | boolean;
}
