import { Module } from '@nestjs/common';
import { ScheduleController } from './controllers/schedule/schedule.controller';

@Module({
  controllers: [ScheduleController],
})
export class ScheduleModule {}
