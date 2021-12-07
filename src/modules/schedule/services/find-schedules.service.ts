import { Injectable } from '@nestjs/common';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';
import { ScheduleGateway } from '../gateway/schedule.gateway';

@Injectable()
export class FindSchedulesService {
  constructor(
    private readonly scheduleGateway: ScheduleGateway,
    private readonly benefitGateway: BenefitGateway,
  ) {}

  async execute(email: string) {
    const benefit = await this.benefitGateway.getBenefitByEmail(email);

    return await this.scheduleGateway.findByEmailBenefit(benefit.benefit);
  }
}
