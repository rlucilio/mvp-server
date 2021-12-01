import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { BenefitBody } from './models/benefit-body';
import { BenefitEmotional } from './models/benefit-emotional';

export type BenefitDocument = Benefit & Document;

@Schema()
export class Benefit {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({ type: BenefitBody })
  body: Array<BenefitBody>;

  @Prop({ type: BenefitEmotional })
  emotional: Array<BenefitEmotional>;

  @Prop()
  birthDate: string;

  @Prop({ type: Date, default: new Date() })
  insertDate: Date;

  @Prop({ type: Date, default: new Date() })
  updateDate: Date;
}

export const BenefitSchema = SchemaFactory.createForClass(Benefit);
