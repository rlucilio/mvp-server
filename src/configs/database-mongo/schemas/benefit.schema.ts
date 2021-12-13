import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { BenefitBody } from './models/benefit-body';
import { BenefitEmotional } from './models/benefit-emotional';
import { Task } from './task.schema';

export type BenefitDocument = Benefit & Document;
export class Questions {
  question: string;
  answer: string;
}

export interface TasksBenefit {
  task: Task;
  result: any;
  expected: any;
}

export class PlanBenefit {
  tasks: TasksBenefit[];
  beginDate: Date | null;
  endDate: Date;
}

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

  @Prop()
  answeredForm: boolean;

  @Prop({ type: Questions })
  questions: Questions[];

  @Prop({ type: PlanBenefit })
  plan: PlanBenefit;
}

export const BenefitSchema = SchemaFactory.createForClass(Benefit);
