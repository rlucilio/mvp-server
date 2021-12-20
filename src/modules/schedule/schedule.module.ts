import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Benefit,
  BenefitSchema,
} from 'src/configs/database-mongo/schemas/benefit.schema';
import {
  Provider,
  ProvideSchema,
} from 'src/configs/database-mongo/schemas/provider.schema';
import {
  Schedule,
  ScheduleSchema,
} from 'src/configs/database-mongo/schemas/schedule.schema';
import {
  Task,
  TaskSchema,
} from 'src/configs/database-mongo/schemas/task.schema';
import {
  User,
  UserSchema,
} from 'src/configs/database-mongo/schemas/user.schema';
import { AuthModule } from 'src/core/auth/auth.module';
import { BenefitGateway } from '../benefit/gateways/benefit.gateway';
import { ProviderGateway } from '../provider/gateways/provider.gateway';
import { ScheduleController } from './controllers/schedule.controller';
import { ScheduleGateway } from './gateway/schedule.gateway';
import { CreateScheduleService } from './services/create-schedule.service';
import { FindSchedulesService } from './services/find-schedules.service';
import { GetSchedulesService } from './services/get-schedules.service';
import { SyncSchedulesService } from './services/sync-schedules.service';

@Module({
  controllers: [ScheduleController],
  providers: [
    SyncSchedulesService,
    ScheduleGateway,
    ProviderGateway,
    GetSchedulesService,
    FindSchedulesService,
    BenefitGateway,
    CreateScheduleService,
  ],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProvideSchema },
      { name: User.name, schema: UserSchema },
      { name: Schedule.name, schema: ScheduleSchema },
      { name: Benefit.name, schema: BenefitSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
})
export class ScheduleModule {}
