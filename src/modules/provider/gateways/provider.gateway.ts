import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
