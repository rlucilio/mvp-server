import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

class Input {
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
    label2: number;
  };
}

@Schema()
export class Task {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Input, required: true })
  input: Input;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
