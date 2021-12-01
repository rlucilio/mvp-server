import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BenefitGateway } from '../gateways/benefit.gateway';
import { UpdateBenefitModel } from './models/update-benefit.model';

@Injectable()
export class UpdateBenefitService {
  private readonly logger = new Logger(UpdateBenefitService.name);

  constructor(private readonly userGateway: BenefitGateway) {}

  async execute(model: UpdateBenefitModel) {
    this.logger.log('[BEGIN] update benefit');

    try {
      this.logger.log('Try get user by email');
      await this.userGateway.updateBenefit(model.email, model);
    } catch (error) {
      throw new HttpException(
        'Error in update benefit',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.log('[END] update benefit');
  }
}
