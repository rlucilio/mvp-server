import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BenefitGateway } from '../gateways/benefit.gateway';

@Injectable()
export class FindBenefitService {
  private readonly logger = new Logger(FindBenefitService.name);
  constructor(private readonly benefitGateway: BenefitGateway) {}

  async execute(email: string) {
    this.logger.log('[BEGIN] find benefit');
    try {
      const benefit = await this.benefitGateway.getBenefitByEmail(email);

      return benefit;
    } catch (error) {
      this.logger.log('[END] find benefit');
      throw new HttpException('Benefit find benefit', HttpStatus.NOT_FOUND);
    }
  }
}
