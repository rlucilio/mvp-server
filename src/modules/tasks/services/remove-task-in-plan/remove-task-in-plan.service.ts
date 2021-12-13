import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Document } from 'mongoose';
import { TasksBenefit } from 'src/configs/database-mongo/schemas/benefit.schema';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';

@Injectable()
export class RemoveTaskInPlanService {
  constructor(private readonly benefitGateway: BenefitGateway) {}

  async execute(idTask: string, email: string) {
    try {
      const benefit = await this.benefitGateway.getBenefitByEmail(email);

      if (!benefit?.benefit?.plan) throw new Error('Non-initiated plan');

      const tasks = benefit.benefit.plan.tasks.filter(
        (task: TasksBenefit) =>
          !!((task.task as unknown as Document)._id !== idTask),
      );

      benefit.benefit.plan.tasks = tasks;

      await benefit.benefit.update();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
