import { Injectable } from '@nestjs/common';
import { Provider } from 'src/configs/database-mongo/schemas/provider.schema';
import { Schedule } from 'src/configs/database-mongo/schemas/schedule.schema';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';
import { ProviderGateway } from 'src/modules/provider/gateways/provider.gateway';
import { ScheduleGateway } from '../gateway/schedule.gateway';

@Injectable()
export class FindSchedulesService {
  constructor(
    private readonly scheduleGateway: ScheduleGateway,
    private readonly benefitGateway: BenefitGateway,
    private readonly providerGateway: ProviderGateway,
  ) {}

  async execute(email: string) {
    const benefit = await this.benefitGateway.getBenefitByEmail(email);

    const response: { schedule: Schedule; provider: Provider }[] = [];
    const schedules = await this.scheduleGateway.findByEmailBenefit(
      benefit.benefit,
    );

    for await (const schedule of schedules) {
      const provider = await this.providerGateway.findById(schedule.provider);
      response.push({ schedule: schedule, provider: provider.provider });
    }

    return response;
  }
}
