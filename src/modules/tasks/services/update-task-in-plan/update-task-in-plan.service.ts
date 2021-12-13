import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Document } from 'mongoose';
import { TasksBenefit } from 'src/configs/database-mongo/schemas/benefit.schema';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';

@Injectable()
export class UpdateTaskInPlanService {
  constructor(private readonly benefitGateway: BenefitGateway) {}

  async execute(idTask: string, emailBenefit: string, value: number | boolean) {
    try {
      const benefit = await this.benefitGateway.getBenefitByEmail(emailBenefit);

      if (!benefit?.benefit?.plan) throw new Error('Non-initiated plan');

      const taskIndex = await benefit?.benefit?.plan.tasks.findIndex(
        (task) => (task.task as unknown as Document)._id === idTask,
      );
      if (taskIndex) throw new Error('Not found task');

      const taskBenefit: TasksBenefit = benefit.benefit.plan.tasks[idTask];

      taskBenefit.result = value;
      taskBenefit.status =
        value === taskBenefit.expected ? 'FINISH' : 'STARTED';

      benefit.benefit.plan.tasks[idTask] = taskBenefit;

      await benefit.benefit.update();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
