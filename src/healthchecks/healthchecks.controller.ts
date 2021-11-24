import { Controller, Get } from '@nestjs/common';
import { HealthchecksService } from './healthchecks.service';

@Controller('healthchecks')
export class HealthchecksController {
  constructor(private readonly healthchecksService: HealthchecksService) {}

  @Get('/readiness')
  getReadiness() {
    return this.healthchecksService.ready();
  }

  @Get('/liveness')
  getLiveness() {
    return this.healthchecksService.alive();
  }
}
