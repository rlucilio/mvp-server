import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthchecksService {
  ready() {
    return Date.now();
  }

  alive() {
    return {
      service: false,
      resource: {},
    };
  }
}
