import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Benefit,
  BenefitDocument,
} from 'src/configs/database-mongo/schemas/benefit.schema';
import {
  Provider,
  ProviderDocument,
} from 'src/configs/database-mongo/schemas/provider.schema';
import {
  User,
  UserDocument,
} from 'src/configs/database-mongo/schemas/user.schema';
import { CreateUserModel } from '../services/models/create-user.model';

@Injectable()
export class UserGateway {
  constructor(
    @InjectModel(User.name) private userDocument: Model<UserDocument>,
    @InjectModel(Benefit.name) private benefitDocument: Model<BenefitDocument>,
    @InjectModel(Provider.name)
    private providerDocument: Model<ProviderDocument>,
  ) {}

  async creteBenefit(model: CreateUserModel) {
    const createdUser = await this.createUser(model);

    const createdBenefit = new this.benefitDocument();
    createdBenefit.birthDate = model.birthDate;
    createdBenefit.user = createdUser;

    return await createdBenefit.save();
  }

  async createProvider(model: CreateUserModel) {
    const createdUser = await this.createUser(model);
    const createdProvider = new this.providerDocument();

    createdProvider.user = createdUser;
    return await createdProvider.save();
  }

  private async createUser(model: CreateUserModel) {
    const createdUser = new this.userDocument();
    createdUser.name = model.name;
    createdUser.mail = model.mail;
    createdUser.pass = model.pass;
    return await createdUser.save();
  }
}
