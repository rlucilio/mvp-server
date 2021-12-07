import { Injectable } from '@nestjs/common';
import { ProviderGateway } from 'src/modules/provider/gateways/provider.gateway';
import { ScheduleGateway } from '../gateway/schedule.gateway';
import { SyncSchedulesModel } from './models/sync-schedules.model';

@Injectable()
export class SyncSchedulesService {
  constructor(
    private readonly scheduleGateway: ScheduleGateway,
    private readonly providerGateway: ProviderGateway,
  ) {}
  async execute(modelList: SyncSchedulesModel[]) {
    await modelList.forEach(async (model) => {
      try {
        const resultProvider = await this.providerGateway.findProvider(
          model.emailProvider,
        );

        if (resultProvider.user && resultProvider.provider) {
          const scheduleResult = await this.scheduleGateway.findByCod(
            model.cod,
          );

          if (scheduleResult) {
            await this.scheduleGateway.update(model);
          } else {
            await this.scheduleGateway.add(model, resultProvider.provider);
          }
        }
      } catch (error) {}
    });
  }
}
