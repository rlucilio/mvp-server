import { Body, Controller, Post } from '@nestjs/common';
import { SyncSchedulesDto } from '../dtos/sync-schedules.dto';

@Controller('schedule')
export class ScheduleController {
  @Post('sync')
  async syncSchedulesWithSheets(@Body() dto: SyncSchedulesDto) {
    console.log(dto);
  }
}
