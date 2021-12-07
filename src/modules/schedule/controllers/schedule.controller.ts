import { Body, Controller, Post } from '@nestjs/common';
import { SyncSchedulesModel } from '../services/models/sync-schedules.model';
import { SyncSchedulesService } from '../services/sync-schedules.service';
import { SyncSchedulesDto } from './dtos/sync-schedules.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly syncSchedules: SyncSchedulesService) {}

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
}
