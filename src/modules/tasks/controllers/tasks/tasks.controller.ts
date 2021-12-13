import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskService } from '../../services/create-task/create-task.service';
import {
  CreateTasksModel,
  InputType,
  TypeTasks,
} from '../../services/models/create-tasks.model';
import { CreateTasksDto } from './dto/create-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly create: CreateTaskService) {}

  @Post()
  async createTask(@Body() dto: CreateTasksDto) {
    this.create.execute(
      new CreateTasksModel(TypeTasks[dto.type], dto.name, dto.description, {
        type: InputType[dto.inputType],
        label: dto.inputLabel,
        check: dto.inputCheck
          ? {
              trueLabel: dto.inputCheck.trueLabel,
              falseLabel: dto.inputCheck.falseLabel,
            }
          : null,
        count: dto.inputCount
          ? {
              min: dto.inputCount.minValue,
              max: dto.inputCount.maxValue,
              default: dto.inputCount.defaultValue,
              multiplesLabel: dto.inputCount.labelMultiplesValue,
              uniqueLabel: dto.inputCount.labelOneValue,
            }
          : null,
        gain: {
          label: dto.gainLabel,
          value: dto.gainInValue,
        },
      }),
    );
  }
}
