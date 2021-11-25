import {
  IsDateString,
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
  @IsString()
  @MinLength(3)
  pass: string;

  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  @IsIn(['BENEFIT', 'PROVIDER'])
  type: 'BENEFIT' | 'PROVIDER';

  @IsDateString()
  birthDate: Date;
}
