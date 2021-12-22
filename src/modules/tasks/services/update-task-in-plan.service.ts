import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Document } from 'mongoose';
import { TasksBenefit } from 'src/configs/database-mongo/schemas/benefit.schema';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';

@Injectable()
export class UpdateTaskInPlanService {
  constructor(private readonly benefitGateway: BenefitGateway) {}

  async execute(idTask: string, emailBenefit: string, value: number | boolean) {
    try {
      const benefit = (
        await this.benefitGateway.getBenefitByEmail(emailBenefit)
      ).benefit;

      if (!benefit?.plan) throw new Error('Non-initiated plan');

      const taskIndex = await benefit?.plan.tasks.findIndex(
        (task) =>
          (task.task as unknown as Document)._id.equals(idTask) &&
          task.status === 'WAIT',
      );
      if (taskIndex < 0) throw new Error('Not found task');

      const taskBenefit: TasksBenefit = benefit.plan.tasks[taskIndex];

      taskBenefit.result = value;
      taskBenefit.status =
        value === taskBenefit.expected ? 'FINISH' : 'STARTED';
      taskBenefit.updateDate = new Date();

      const now = moment(new Date());
      const lastWeek = moment(new Date()).subtract(1, 'week');
      await benefit.update({ plan: benefit?.plan });

      if (
        benefit?.emotional &&
        benefit.emotional[benefit.emotional.length - 1]
      ) {
        const lastFeedBack = moment(
          benefit.emotional[benefit.emotional.length - 1].insertDate,
        );
        if (lastFeedBack.isBetween(lastWeek, now)) {
          return { needFeedBack: false };
        } else {
          return { needFeedBack: true };
        }
      } else {
        return { needFeedBack: true };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
