import { Body, Controller, Get } from '@nestjs/common';
import { GetReadinessService } from '../services/get-liveness/get-readiness.service';
import { GetLivenessService } from '../services/get-liveness/get-liveness.service';

@Controller('healthchecks')
export class HealthchecksController {
  constructor(
    private readonly getLivenessService: GetReadinessService,
    private readonly getReadinessService: GetLivenessService,
  ) {}

  @Get('/readiness')
  getReadiness() {
    return this.getReadinessService.execute();
  }

  @Get('/liveness')
  getLiveness(@Body() value: any) {
    console.log(value);
    return this.getLivenessService.execute();
  }
}
