import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  oldEmail: string;

  @IsEmail()
  @IsNotEmpty()
  newEmail: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  newPass: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  mobilePhone: string;

  @IsNotEmpty()
  @IsBoolean()
  acceptTerm: boolean;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Masculino', 'Feminino', 'Não informado'])
  gender: string;
}
