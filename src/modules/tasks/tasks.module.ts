import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Task,
  TaskSchema,
} from 'src/configs/database-mongo/schemas/task.schema';
import { TasksController } from './controllers/tasks/tasks.controller';
import { TaskGateway } from './gateways/task.gateway';
import { CreateTaskService } from './services/create-task/create-task.service';

@Module({
  controllers: [TasksController],
  providers: [CreateTaskService, TaskGateway],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
})
export class TasksModule {}
