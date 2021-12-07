import { Injectable } from '@nestjs/common';
import { ProviderGateway } from 'src/modules/provider/gateways/provider.gateway';
import { ScheduleGateway } from '../gateway/schedule.gateway';

@Injectable()
export class GetSchedulesService {
  constructor(
    private readonly scheduleGateway: ScheduleGateway,
    private readonly providerGateway: ProviderGateway,
  ) {}

  async execute() {
    const result = await this.scheduleGateway.getAll();
    const response = [];

    for await (const schedule of result) {
      const provider = await this.providerGateway.findById(schedule.provider);

      response.push({
        cod: schedule.cod,
        room: schedule.room,
        dateTime: schedule.dateTime,
        provider: {
          specialty: provider.provider.specialty,
          email: provider.user.email,
          name: provider.user.name,
          gender: provider.user.gender,
          phone: provider.user.phone,
          state: provider.user.state,
        },
      });
    }

    return response;
  }
}
