import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BenefitGateway } from 'src/modules/benefit/gateways/benefit.gateway';
import { TaskGateway } from '../gateways/task.gateway';
import * as moment from 'moment';

@Injectable()
export class AddTaskInPlanService {
  constructor(
    private readonly benefitGateway: BenefitGateway,
    private readonly taskGateway: TaskGateway,
  ) {}
  async execute(
    emailBenefit: string,
    tasks: {
      idTask: string;
      date: string;
      expected: number | boolean;
    }[],
  ) {
    try {
      const benefit = (
        await this.benefitGateway.getBenefitByEmail(emailBenefit)
      ).benefit;

      tasks.forEach((task) => {
        if (
          moment(task.date, 'DD/MM/YYYY').isAfter(
            moment(benefit.plan.endDate, 'DD/MM/YYYY'),
          )
        ) {
          throw new Error(
            'Não é possível adicionar uma tarefa após o termino do plano',
          );
        }
      });

      for await (const newTask of tasks) {
        if (!benefit?.plan) throw new Error('Non-initiated plan');

        const task = await this.taskGateway.findById(newTask.idTask);
        if (task) throw new Error('Not found task');

        benefit.plan.tasks.push({
          task: task,
          expected: newTask.expected,
          status: 'WAIT',
          date: newTask.date,
        });
      }
      await benefit.update();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
