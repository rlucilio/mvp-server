import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
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
}
