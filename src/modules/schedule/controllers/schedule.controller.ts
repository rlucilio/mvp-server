import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FindSchedulesService } from '../services/find-schedules.service';
import { GetSchedulesService } from '../services/get-schedules.service';
import { SyncSchedulesModel } from '../services/models/sync-schedules.model';
import { SyncSchedulesService } from '../services/sync-schedules.service';
import { FindScheduleBenefitDto } from './dtos/find-schedules-benefit.dto';
import { SyncSchedulesDto } from './dtos/sync-schedules.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly syncSchedules: SyncSchedulesService,
    private readonly getSchedulesAll: GetSchedulesService,
    private readonly findSchedulesService: FindSchedulesService,
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

  @Get('/benefit')
  async getScheduleByEmailBenefit(@Query() dto: FindScheduleBenefitDto) {
    return await this.findSchedulesService.execute(dto.email);
  }
}
