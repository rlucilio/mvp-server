import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Provider,
  ProvideSchema,
} from 'src/configs/database-mongo/schemas/provider.schema';
import {
  Schedule,
  ScheduleSchema,
} from 'src/configs/database-mongo/schemas/schedule.schema';
import {
  User,
  UserSchema,
} from 'src/configs/database-mongo/schemas/user.schema';
import { AuthModule } from 'src/core/auth/auth.module';
import { ProviderGateway } from '../provider/gateways/provider.gateway';
import { ScheduleController } from './controllers/schedule.controller';
import { ScheduleGateway } from './gateway/schedule.gateway';
import { GetSchedulesService } from './services/get-schedules.service';
import { SyncSchedulesService } from './services/sync-schedules.service';

@Module({
  controllers: [ScheduleController],
  providers: [
    SyncSchedulesService,
    ScheduleGateway,
    ProviderGateway,
    GetSchedulesService,
  ],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProvideSchema },
      { name: User.name, schema: UserSchema },
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
})
export class ScheduleModule {}
