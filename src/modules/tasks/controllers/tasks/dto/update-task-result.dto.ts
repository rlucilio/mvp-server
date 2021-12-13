import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateTaskResultDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsMongoId()
  @IsNotEmpty()
  task: string;

  @IsNotEmpty()
  value: number | boolean;
}
