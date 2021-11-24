import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class HealthchecksService {
  constructor(@InjectConnection() private connection: Connection) {}

  ready() {
    return Date.now();
  }

  alive() {
    return {
      service: false,
      resource: {
        port: process.env.MONGO_URL,
        MongoDB: !!(this.connection.readyState === 1),
      },
    };
  }
}
