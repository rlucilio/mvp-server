import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Benefit } from 'src/configs/database-mongo/schemas/benefit.schema';
import { Provider } from 'src/configs/database-mongo/schemas/provider.schema';
import {
  Schedule,
  ScheduleDocument,
} from 'src/configs/database-mongo/schemas/schedule.schema';
import { SyncSchedulesModel } from '../services/models/sync-schedules.model';

@Injectable()
export class ScheduleGateway {
  constructor(
    @InjectModel(Schedule.name)
    private scheduleDocument: Model<ScheduleDocument>,
  ) {}

  async add(model: SyncSchedulesModel, provider: Provider) {
    await this.scheduleDocument.create({
      provider,
      cod: model.cod,
      dateTime: model.dateTime,
      room: model.link,
      status: model.status,
    });
  }

  async update(model: SyncSchedulesModel) {
    await this.scheduleDocument.findOneAndUpdate(
      { cod: model.cod },
      {
        dateTime: model.dateTime,
        room: model.link,
        status: model.status,
      },
    );
  }

  async findByCod(cod: string) {
    return await this.scheduleDocument.findOne({ cod });
  }

  async getAll() {
    return await this.scheduleDocument.find({ benefit: null });
  }

  async findByEmailBenefit(benefit: Benefit) {
    return await this.scheduleDocument.find({ benefit });
  }

  async createSchedule(benefit: Benefit, schedule: Schedule) {
    return await this.scheduleDocument.findOneAndUpdate(
      { cod: schedule.cod },
      { benefit },
    );
  }
}
