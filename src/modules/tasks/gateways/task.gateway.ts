import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Task,
  TaskDocument,
} from 'src/configs/database-mongo/schemas/task.schema';
import {
  CreateTasksModel,
  TypeTasks,
} from '../services/models/create-tasks.model';

@Injectable()
export class TaskGateway {
  constructor(
    @InjectModel(Task.name) private readonly taskDocument: Model<TaskDocument>,
  ) {}

  async create(model: CreateTasksModel) {
    await this.taskDocument.create({
      type: model.type,
      name: model.name,
      description: model.description,
      input: {
        type: model.input,
        label: model.input.label,
        check: model.input.check
          ? {
              falseLabel: model.input.check.falseLabel,
              trueLabel: model.input.check.trueLabel,
            }
          : null,
        count: model.input.count
          ? {
              min: model.input.count.min,
              max: model.input.count.max,
              default: model.input.count.default,
              multiplesLabel: model.input.count.multiplesLabel,
              uniqueLabel: model.input.count.uniqueLabel,
            }
          : null,
        gain: {
          label: model.input.gain.label,
          label2: model.input.gain.label2,
        },
      },
    });
  }

  async findAll() {
    return await this.taskDocument.find();
  }

  async findByType(type: TypeTasks) {
    return await this.taskDocument.find({ type });
  }

  async findById(id: string) {
    return await this.taskDocument.findById(id);
  }
}
