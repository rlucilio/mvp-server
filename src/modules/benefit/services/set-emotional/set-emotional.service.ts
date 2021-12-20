import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BenefitGateway } from '../../gateways/benefit.gateway';

@Injectable()
export class SetEmotionalService {
  constructor(private readonly gateway: BenefitGateway) {}

  async execute(email: string, nps: number) {
    try {
      const benefit = await this.gateway.getBenefitByEmail(email);

      if (!benefit.benefit) throw new Error('Benefit not found');

      const emotionalList = benefit.benefit.emotional ?? [];
      emotionalList.push({
        npsEmotional: nps,
        insertDate: new Date(),
        updateDate: new Date(),
      });
      benefit.benefit.emotional = emotionalList;
      benefit.benefit.update();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
