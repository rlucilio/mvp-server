import { Injectable } from '@nestjs/common';
import { ProviderGateway } from 'src/modules/provider/gateways/provider.gateway';
import { ScheduleGateway } from '../gateway/schedule.gateway';

@Injectable()
export class GetSchedulesService {
  constructor(
    private readonly scheduleGateway: ScheduleGateway,
    private readonly providerGateway: ProviderGateway,
  ) {}

  async execute(specialty: string) {
    const result = await this.scheduleGateway.getAll();
    const response = [];

    for await (const schedule of result) {
      const provider = await this.providerGateway.findById(schedule.provider);

      response.push({
        cod: schedule.cod,
        room: schedule.room,
        dateTime: schedule.dateTime,
        status: schedule.status,
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

    if (specialty !== 'ALL') {
      return response
        .filter((schedule) => schedule.provider.specialty === specialty)
        .filter((schedule) => schedule.provider.state === 'ACTIVATED');
    } else {
      return response.filter(
        (schedule) => schedule.provider.state === 'ACTIVATED',
      );
    }
  }
}
