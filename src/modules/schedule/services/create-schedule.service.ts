import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';
import { ScheduleGateway } from '../gateway/schedule.gateway';
import { CreateSchedulesModel } from './models/create-schedule.model';

@Injectable()
export class CreateScheduleService {
  constructor(
    private readonly scheduleGateway: ScheduleGateway,
    private readonly benefitGateway: BenefitGateway,
  ) {}

  async execute(model: CreateSchedulesModel) {
    const benefit = (await this.benefitGateway.getBenefitByEmail(model.email))
      .benefit;
    const schedule = await this.scheduleGateway.findByCod(model.cod);

    if (benefit && schedule) {
      if (schedule.benefit !== null) {
        this.scheduleGateway.createSchedule(benefit, schedule);
      } else {
        throw new HttpException('Schedule in use', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException(
        'Benefit or schedule not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
