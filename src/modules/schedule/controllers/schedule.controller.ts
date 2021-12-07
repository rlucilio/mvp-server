import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetSchedulesService } from '../services/get-schedules.service';
import { SyncSchedulesModel } from '../services/models/sync-schedules.model';
import { SyncSchedulesService } from '../services/sync-schedules.service';
import { SyncSchedulesDto } from './dtos/sync-schedules.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly syncSchedules: SyncSchedulesService,
    private readonly getSchedulesAll: GetSchedulesService,
  ) {}

  @Post('sync')
  async syncSchedulesWithSheets(@Body() dtoList: SyncSchedulesDto[]) {
    await this.syncSchedules.execute(
      dtoList.map(
        (dto) =>
          new SyncSchedulesModel(
            dto['E-mail prestador'],
            dto['E-mail beneficiário'],
            dto['Data/hora'],
            dto['Link da videochamada (Google Meet)'],
            dto.Status,
            dto.ID,
          ),
      ),
    );
  }

  @Get()
  async getSchedules() {
    return await this.getSchedulesAll.execute();
  }
}
