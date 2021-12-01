import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserState } from './enums/user-state.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  pass: string;

  @Prop({ required: true, enum: UserState, default: UserState.pending })
  state: string;

  @Prop({ default: new Date(), type: Date })
  insertDate: Date;

  @Prop({ default: new Date(), type: Date })
  updateDate: Date;

  @Prop({ type: String })
  urlPhoto: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
