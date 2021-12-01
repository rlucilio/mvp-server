import { Injectable } from '@nestjs/common';

@Injectable()
export class GetReadinessService {
  execute() {
    return Date.now();
  }
}
