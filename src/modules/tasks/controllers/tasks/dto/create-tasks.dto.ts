import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

class InputCheck {
  @IsString()
  @IsNotEmpty()
  trueLabel: string;

  @IsString()
  @IsNotEmpty()
  falseLabel: string;
}

class InputCount {
  @IsNumber()
  @IsNotEmpty()
  minValue: number;

  @IsNumber()
  @IsNotEmpty()
  maxValue: number;

  @IsNumber()
  @IsNotEmpty()
  defaultValue: number;

  @IsString()
  @IsNotEmpty()
  labelMultiplesValue: string;

  @IsString()
  @IsNotEmpty()
  labelOneValue: string;
}

export class CreateTasksDto {
  @IsIn(['FOOD', 'LIFESTYLE', 'WORKOUTS'])
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  inputLabel: string;

  @IsNotEmpty()
  @IsIn(['CHECK', 'COUNT'])
  inputType: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsObject()
  inputCheck: InputCheck;

  @IsOptional()
  @IsObject()
  inputCount: InputCount;

  @IsString()
  @IsNotEmpty()
  gainLabel2: string;

  @IsString()
  @IsNotEmpty()
  gainLabel: string;
}
