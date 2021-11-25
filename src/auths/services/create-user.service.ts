import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import { CreateUserModel } from './models/create-user.model';

@Injectable()
export class CreateUserService {
  constructor(private readonly userGateway: UserGateway) {}

  async execute(model: CreateUserModel) {
    try {
      if (model.type === 'BENEFIT') {
        await this.userGateway.creteBenefit(model);
      } else {
        await this.userGateway.createProvider(model);
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: error.message,
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
