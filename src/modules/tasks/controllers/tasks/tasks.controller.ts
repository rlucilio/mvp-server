import { Body, Controller, Delete, Post, Put, Query } from '@nestjs/common';
import { AddTaskInPlanService } from '../../services/add-task-in-plan/add-task-in-plan.service';
import { CreateTaskService } from '../../services/create-task/create-task.service';
import {
  CreateTasksModel,
  InputType,
  TypeTasks,
} from '../../services/models/create-tasks.model';
import { RemoveTaskInPlanService } from '../../services/remove-task-in-plan/remove-task-in-plan.service';
import { AddTaskInPlanDto } from './dto/add-task-in-plan.dto';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { RemoveTaskDto } from './dto/remove-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly create: CreateTaskService,
    private readonly addTask: AddTaskInPlanService,
    private readonly removeTask: RemoveTaskInPlanService,
  ) {}

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

  @Put('/plan/task')
  async addTaskInPlan(@Body() dto: AddTaskInPlanDto) {
    await this.addTask.execute(dto.task, dto.email, dto.expected);
  }

  @Delete('/plan/task')
  async removeTaskInPlan(@Query() dto: RemoveTaskDto) {
    await this.removeTask.execute(dto.task, dto.email);
  }
}
