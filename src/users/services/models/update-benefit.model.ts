import { IsDateString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBenefitModel {
  constructor(
    public email: string,
    public dateBirth: Date,
    public weight: number,
    public height: number,
  ) {}
}
