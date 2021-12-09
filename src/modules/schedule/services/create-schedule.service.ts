import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SendEMailService } from 'src/core/email/services/send-email.service';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';
import { ProviderGateway } from 'src/modules/provider/gateways/provider.gateway';
import { ScheduleGateway } from '../gateway/schedule.gateway';
import { CreateSchedulesModel } from './models/create-schedule.model';

@Injectable()
export class CreateScheduleService {
  constructor(
    private readonly scheduleGateway: ScheduleGateway,
    private readonly benefitGateway: BenefitGateway,
    private readonly providerGateway: ProviderGateway,
    private readonly sendEmail: SendEMailService,
  ) {}

  async execute(model: CreateSchedulesModel) {
    const benefit = await this.benefitGateway.getBenefitByEmail(model.email);

    const schedule = await this.scheduleGateway.findByCod(model.cod);
    if (benefit && schedule) {
      if (schedule.benefit !== null) {
        this.scheduleGateway.createSchedule(benefit.benefit, schedule);
        const provider = await this.providerGateway.findById(schedule.provider);

        await this.sendEmail.execute(
          provider.user.email,
          'Agendamento criado!',
          'schedule',
          {
            codSchedule: randomUUID(),
            dateSchedule: schedule.dateTime,
            name: benefit.user.name,
            email: benefit.user.email,
            phone: benefit.user.phone,
            gender: benefit.user.gender,
            weight:
              benefit.benefit.body[benefit.benefit.body.length - 1].weight,
            height:
              benefit.benefit.body[benefit.benefit.body.length - 1].height,
            questions: benefit.benefit.questions,
          },
        );
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
