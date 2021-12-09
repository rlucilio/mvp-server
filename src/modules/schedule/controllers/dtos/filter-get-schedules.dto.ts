import { IsIn } from 'class-validator';

export class FilterGetSchedulesDto {
  @IsIn(['DOCTOR', 'NURSE', 'NUTRITIONIST', 'PHYSICAL_EDUCATOR', 'ALL'])
  specialty: string;
}
