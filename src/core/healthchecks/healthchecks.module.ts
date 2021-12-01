import { Module } from '@nestjs/common';
import { GetReadinessService } from './services/get-liveness/get-readiness.service';
import { HealthchecksController } from './controllers/healthchecks.controller';
import { GetLivenessService } from './services/get-liveness/get-liveness.service';

@Module({
  controllers: [HealthchecksController],
  providers: [GetReadinessService, GetLivenessService],
})
export class HealthchecksModule {}
