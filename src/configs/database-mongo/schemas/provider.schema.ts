import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Benefit } from './benefit.schema';

export type ProviderDocument = Provider & Document;

@Schema()
export class Provider {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({ type: String })
  specialty: string;

  @Prop({ type: String })
  bio: string;

  @Prop({ type: Date, default: new Date() })
  insertDate: Date;

  @Prop({ type: Date, default: new Date() })
  updateDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Benefit.name })
  benefits: Benefit[];
}

export const ProvideSchema = SchemaFactory.createForClass(Provider);
