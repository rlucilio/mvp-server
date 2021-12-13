import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';
import { TaskGateway } from '../../gateways/task.gateway';

@Injectable()
export class AddTaskInPlanService {
  constructor(
    private readonly benefitGateway: BenefitGateway,
    private readonly taskGateway: TaskGateway,
  ) {}
  async execute(
    idTask: string,
    emailBenefit: string,
    expected: number | boolean,
  ) {
    try {
      const benefit = await this.benefitGateway.getBenefitByEmail(emailBenefit);

      if (!benefit?.benefit?.plan) throw new Error('Non-initiated plan');

      const task = await this.taskGateway.findById(idTask);
      if (task) throw new Error('Not found task');

      benefit.benefit.plan.tasks.push({
        task: task,
        expected,
        status: 'WAIT',
      });
      await benefit.benefit.update();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
