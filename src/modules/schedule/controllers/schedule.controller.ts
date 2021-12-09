import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateScheduleService } from '../services/create-schedule.service';
import { FindSchedulesService } from '../services/find-schedules.service';
import { GetSchedulesService } from '../services/get-schedules.service';
import { CreateSchedulesModel } from '../services/models/create-schedule.model';
import { SyncSchedulesModel } from '../services/models/sync-schedules.model';
import { SyncSchedulesService } from '../services/sync-schedules.service';
import { CreateSchedulesDto } from './dtos/create-schedule.dto';
import { FilterGetSchedulesDto } from './dtos/filter-get-schedules.dto';
import { FindScheduleBenefitDto } from './dtos/find-schedules-benefit.dto';
import { SyncSchedulesDto } from './dtos/sync-schedules.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly syncSchedules: SyncSchedulesService,
    private readonly getSchedulesAll: GetSchedulesService,
    private readonly findSchedulesService: FindSchedulesService,
    private readonly createScheduleService: CreateScheduleService,
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
  async getSchedules(@Query() dto: FilterGetSchedulesDto) {
    return await this.getSchedulesAll.execute(dto.specialty);
  }

  @Get('/benefit')
  async getScheduleByEmailBenefit(@Query() dto: FindScheduleBenefitDto) {
    return await this.findSchedulesService.execute(dto.email);
  }

  @Post()
  async createSchedule(@Body() dto: CreateSchedulesDto) {
    await this.createScheduleService.execute(
      new CreateSchedulesModel(dto.email, dto.cod),
    );
  }
}
