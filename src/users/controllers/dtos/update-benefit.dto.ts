import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateBenefitDto {
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
  @IsIn(['MALE', 'FEMALE', 'UNINFORMED'])
  gender: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;
}
