import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Benefit,
  BenefitSchema,
} from 'src/configs/database-mongo/schemas/benefit.schema';
import {
  User,
  UserSchema,
} from 'src/configs/database-mongo/schemas/user.schema';
import { AuthModule } from 'src/core/auth/auth.module';
import { BenefitController } from './controllers/benefit.controller';
import { BenefitGateway } from './gateways/benefit.gateway';
import { FindBenefitService } from './services/find-benefit.service';
import { SetAnswerFormService } from './services/set-answer-form.service';
import { UpdateBenefitService } from './services/update-benefit.service';
import { SetEmotionalService } from './services/set-emotional/set-emotional.service';
import {
  Task,
  TaskSchema,
} from 'src/configs/database-mongo/schemas/task.schema';

@Module({
  providers: [
    UpdateBenefitService,
    BenefitGateway,
    SetAnswerFormService,
    FindBenefitService,
    SetEmotionalService,
  ],
  controllers: [BenefitController],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Benefit.name, schema: BenefitSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
})
export class BenefitModule {}
