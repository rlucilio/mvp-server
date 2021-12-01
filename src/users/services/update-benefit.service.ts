import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import { UpdateBenefitModel } from './models/update-benefit.model';

@Injectable()
export class UpdateBenefitService {
  private readonly logger = new Logger(UpdateBenefitService.name);

  constructor(private readonly userGateway: UserGateway) {}

  async execute(model: UpdateBenefitModel) {
    this.logger.log('[BEGIN] update benefit');

    try {
      this.logger.log('Try get user by email');
      const user = await this.userGateway.findForEMail(model.email);

      await this.userGateway.updateBenefit(user._id, model);
    } catch (error) {
      throw new HttpException(
        'Error in update benefit',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.log('[END] update benefit');
  }
}
