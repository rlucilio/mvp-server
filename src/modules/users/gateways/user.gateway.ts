import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Benefit,
  BenefitDocument,
} from 'src/configs/database-mongo/schemas/benefit.schema';
import { UserState } from 'src/configs/database-mongo/schemas/enums/user-state.enum';
import {
  Provider,
  ProviderDocument,
} from 'src/configs/database-mongo/schemas/provider.schema';
import {
  User,
  UserDocument,
} from 'src/configs/database-mongo/schemas/user.schema';
import { UpdateUserModel } from '../services/models/update-user.model';
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
    createdBenefit.user = createdUser;

    return await createdBenefit.save();
  }

  async createProvider(model: CreateUserModel) {
    const createdUser = await this.createUser(model);
    const createdProvider = new this.providerDocument();
    createdProvider.specialty = model.specialty;
    createdProvider.user = createdUser;
    return await createdProvider.save();
  }

  async findForEMail(email: string) {
    return (
      await this.userDocument
        .findOne({
          email,
        })
        .exec()
    ).toObject();
  }

  async findBenefitByUser(user: User) {
    return (await this.benefitDocument.findOne({ user }).exec()).toObject();
  }

  async updateUser(id: string, benefitModel: UpdateUserModel) {
    const user = await this.userDocument.findById(id);

    await user.update({
      name: benefitModel.name,
      email: benefitModel.newEmail,
      phone: benefitModel.mobilePhone,
      gender: benefitModel.gender,
    });
  }

  async changePassAndState(id: string, pass: string, state?: UserState) {
    await this.userDocument.findByIdAndUpdate(
      id,
      state ? { pass, state: state } : { pass },
    );
  }

  private async createUser(model: CreateUserModel) {
    const createdUser = new this.userDocument();
    createdUser.name = model.name;
    createdUser.email = model.email;
    return await createdUser.save();
  }
}
