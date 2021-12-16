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
        (task) => (task.task as unknown as Document)._id === idTask,
      );
      if (taskIndex) throw new Error('Not found task');

      const taskBenefit: TasksBenefit = benefit.plan.tasks[idTask];

      taskBenefit.result = value;
      taskBenefit.status =
        value === taskBenefit.expected ? 'FINISH' : 'STARTED';
      taskBenefit.date = moment(new Date()).format('DD/MM/YYYY');

      benefit.plan.tasks[idTask] = taskBenefit;

      await benefit.update();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
