import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Task,
  TaskSchema,
} from 'src/configs/database-mongo/schemas/task.schema';
import { TasksController } from './controllers/tasks/tasks.controller';
import { TaskGateway } from './gateways/task.gateway';
import { CreateTaskService } from './services/create-task/create-task.service';
import { AddTaskInPlanService } from './services/add-task-in-plan/add-task-in-plan.service';
import {
  Benefit,
  BenefitSchema,
} from 'src/configs/database-mongo/schemas/benefit.schema';
import {
  User,
  UserSchema,
} from 'src/configs/database-mongo/schemas/user.schema';
import { BenefitGateway } from '../benefit/gateways/benefit.gateway';

@Module({
  controllers: [TasksController],
  providers: [
    CreateTaskService,
    TaskGateway,
    AddTaskInPlanService,
    TaskGateway,
    BenefitGateway,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Benefit.name, schema: BenefitSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class TasksModule {}
