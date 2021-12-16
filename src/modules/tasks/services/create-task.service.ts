import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskGateway } from '../gateways/task.gateway';
import { CreateTasksModel } from './models/create-tasks.model';

@Injectable()
export class CreateTaskService {
  constructor(private readonly gateway: TaskGateway) {}

  async execute(model: CreateTasksModel) {
    try {
      await this.gateway.create(model);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
