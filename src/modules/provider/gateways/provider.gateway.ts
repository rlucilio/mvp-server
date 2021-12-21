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
import { UpdateProviderModel } from '../services/models/update-provider.model';

@Injectable()
export class ProviderGateway {
  constructor(
    @InjectModel(User.name) private userDocument: Model<UserDocument>,
    @InjectModel(Provider.name)
    private providerDocument: Model<ProviderDocument>,
    @InjectModel(Benefit.name) private benefitDocument: Model<BenefitDocument>,
  ) {}

  async updateProvider(email: string, benefitModel: UpdateProviderModel) {
    const user = await this.userDocument
      .findOne({
        email,
      })
      .exec();

    const provider = await this.providerDocument.findOne({ user });

    await provider.update({
      bio: benefitModel.bio,
    });
  }

  async findProvider(email: string) {
    const user = await this.userDocument
      .findOne({
        email,
      })
      .exec();

    const provider = await this.providerDocument.findOne({ user });

    if (provider.benefits) {
      const benefits = await provider.benefits
        .map(async (benefit) => await this.benefitDocument.findById(benefit))
        .map(async (benefit) => await (await benefit).populate('user'));

      provider.benefits = benefits as any;
    }

    return {
      provider,
      user,
    };
  }

  async findById(id: any) {
    const provider = await this.providerDocument.findById(id).exec();

    return {
      provider,
      user: await this.userDocument.findById(provider.user),
    };
  }
}
