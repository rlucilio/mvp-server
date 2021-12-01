import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ProviderGateway } from '../gateways/provider.gateway';
import { UpdateProviderModel } from './models/update-provider.model';

@Injectable()
export class UpdateProviderService {
  private readonly logger = new Logger(UpdateProviderService.name);

  constructor(private readonly userGateway: ProviderGateway) {}

  async execute(model: UpdateProviderModel) {
    this.logger.log('[BEGIN] update benefit');

    try {
      this.logger.log('Try get user by email');

      await this.userGateway.updateProvider(model.email, model);
    } catch (error) {
      throw new HttpException(
        'Error in update benefit',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.log('[END] update benefit');
  }
}
