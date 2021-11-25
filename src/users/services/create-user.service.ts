import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import { CreateUserModel } from './models/create-user.model';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);
  constructor(private readonly userGateway: UserGateway) {}

  async execute(model: CreateUserModel) {
    try {
      this.logger.log('[BEGIN] Create user');

      if (model.type === 'BENEFIT') {
        this.logger.log('Create benefit');
        await this.userGateway.creteBenefit(model);
      } else {
        this.logger.log('Create provider');
        await this.userGateway.createProvider(model);
      }

      this.logger.log('[END] Create user');
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
