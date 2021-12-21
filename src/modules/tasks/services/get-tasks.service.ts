import { Injectable } from '@nestjs/common';
import { TaskGateway } from '../gateways/task.gateway';

@Injectable()
export class GetTasksService {
  constructor(private readonly taskGateway: TaskGateway) {}

  async execute() {
    return await this.taskGateway.findAll();
  }
}
