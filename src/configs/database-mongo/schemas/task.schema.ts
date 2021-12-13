import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task | Document;

@Schema()
export class Task {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Object, required: true })
  input: {
    type: string;
    label: string;
    check: {
      falseLabel: string;
      trueLabel: string;
    };
    count: {
      min: number;
      max: number;
      default: number;
      multiplesLabel: string;
      uniqueLabel: string;
    };
    gain: {
      label: string;
      value: number;
    };
  };
}

export const TaskSchema = SchemaFactory.createForClass(Task);
