import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindProviderDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
