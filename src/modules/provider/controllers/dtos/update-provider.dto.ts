import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProviderDto {
  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
