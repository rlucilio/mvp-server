import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';

export class RemoveTaskDto {
  @IsMongoId()
  @IsNotEmpty()
  task: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
