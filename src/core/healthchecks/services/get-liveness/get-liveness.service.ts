import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class GetLivenessService {
  constructor(@InjectConnection() private connection: Connection) {}

  execute() {
    return {
      service: false,
      resource: {
        MongoDB: !!(this.connection.readyState === 1),
      },
    };
  }
}
