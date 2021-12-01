import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn(['BENEFIT', 'PROVIDER'])
  type: 'BENEFIT' | 'PROVIDER';

  @IsNotEmpty()
  @IsString()
  key: string;
}
