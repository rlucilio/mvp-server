import { IsIn } from 'class-validator';

export class FilterGetSchedulesDto {
  @IsIn([
    'Médica(o)',
    'Enfermeira(o)',
    'Nutricionista',
    'Educador físico',
    'ALL',
  ])
  specialty: string;
}
