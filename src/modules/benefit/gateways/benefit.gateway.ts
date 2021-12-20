import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Benefit,
  BenefitDocument,
} from 'src/configs/database-mongo/schemas/benefit.schema';
import {
  Task,
  TaskDocument,
} from 'src/configs/database-mongo/schemas/task.schema';
import {
  User,
  UserDocument,
} from 'src/configs/database-mongo/schemas/user.schema';
import { QuestionsModel } from '../services/models/questions.model';
import { UpdateBenefitModel } from '../services/models/update-benefit.model';

@Injectable()
export class BenefitGateway {
  constructor(
    @InjectModel(User.name) private userDocument: Model<UserDocument>,
    @InjectModel(Benefit.name) private benefitDocument: Model<BenefitDocument>,
    @InjectModel(Task.name) private taskDocument: Model<TaskDocument>,
  ) {}

  async updateBenefit(email: string, benefitModel: UpdateBenefitModel) {
    const user = await this.userDocument
      .findOne({
        email,
      })
      .exec();

    const benefit = await this.benefitDocument.findOne({ user });
    const newBody = benefit.body ? benefit.body : [];

    await benefit.update({
      birthDate: benefitModel.dateBirth,
      body: [
        ...newBody,
        { weight: benefitModel.weight, height: benefitModel.height },
      ],
    });
  }

  async setAswForm(email: string, asw: boolean, model: QuestionsModel) {
    const user = await this.userDocument.findOne({ email });

    if (!user) throw new Error('Benefit not found');

    await this.benefitDocument.findOneAndUpdate(
      { user },
      {
        answeredForm: asw,
        questions: model.questions,
      },
    );
  }

  async getBenefitByEmail(email: string) {
    const user = await this.userDocument.findOne({ email });

    if (!user) throw new Error('Benefit not found');
    const benefit = await this.benefitDocument.findOne({ user: user.id });
    if (benefit.plan) {
      const tasks = await benefit.plan.tasks.map(
        async (task) => await this.taskDocument.findById(task),
      );

      benefit.plan.tasks = tasks as any;
    }

    return {
      benefit,
      user,
    };
  }
}
