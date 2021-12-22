import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TasksBenefit } from 'src/configs/database-mongo/schemas/benefit.schema';
import { TaskDocument } from 'src/configs/database-mongo/schemas/task.schema';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';

@Injectable()
export class RemoveTaskInPlanService {
  constructor(private readonly benefitGateway: BenefitGateway) {}

  async execute(idTask: string, email: string) {
    try {
      const benefit = await (
        await this.benefitGateway.getBenefitByEmail(email)
      ).benefit;

      if (!benefit?.plan) throw new Error('Non-initiated plan');

      benefit.plan.tasks = benefit.plan.tasks.filter(
        (task: TasksBenefit) => !(task.task as TaskDocument)._id.equals(idTask),
      );

      await benefit.update({
        $set: {
          plan: { ...benefit.plan },
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
