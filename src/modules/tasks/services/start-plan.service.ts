import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import moment from 'moment';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';

@Injectable()
export class StartPlanService {
  constructor(private readonly gateway: BenefitGateway) {}

  async execute(email: string, startDate: string, endDate: string) {
    try {
      const benefit = (await this.gateway.getBenefitByEmail(email)).benefit;

      if (
        moment(startDate, 'DD/MM/YYYY').isAfter(moment(endDate, 'DD/MM/YYYY'))
      ) {
        throw new Error('Start date can not be after date');
      }

      if (benefit) {
        throw new Error('Benefit not found');
      }

      await benefit.update({
        plan: {
          beginDate: startDate,
          tasks: [],
          endDate: endDate,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
