import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongosse from 'mongoose';

import { Provider } from './provider.schema';
import { Benefit } from './benefit.schema';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  @Prop({ required: true, unique: true })
  cod: string;

  @Prop({
    type: mongosse.Schema.Types.ObjectId,
    ref: Provider.name,
    required: true,
  })
  provider: Provider;

  @Prop({
    type: mongosse.Schema.Types.ObjectId,
    ref: Benefit.name,
  })
  benefit: Benefit;

  @Prop()
  dateTime: string;

  @Prop({ type: Date, default: new Date() })
  insertDate: Date;

  @Prop({ type: Date, default: new Date() })
  updateDate: Date;

  @Prop()
  room: string;

  @Prop()
  status: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
