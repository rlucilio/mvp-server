import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Benefit,
  BenefitDocument,
} from 'src/configs/database-mongo/schemas/benefit.schema';
import {
  User,
  UserDocument,
} from 'src/configs/database-mongo/schemas/user.schema';
import { UpdateBenefitModel } from '../services/models/update-benefit.model';

@Injectable()
export class BenefitGateway {
  constructor(
    @InjectModel(User.name) private userDocument: Model<UserDocument>,
    @InjectModel(Benefit.name) private benefitDocument: Model<BenefitDocument>,
  ) {}

  async updateBenefit(email: string, benefitModel: UpdateBenefitModel) {
    const user = await this.userDocument
      .findOne({
        email,
      })
      .exec();

    const benefit = await this.benefitDocument.findOne({ user });

    await benefit.update({
      birthDate: benefitModel.dateBirth,
      body: [
        ...benefit.body,
        { weight: benefitModel.weight, height: benefitModel.height },
      ],
    });
  }
}
