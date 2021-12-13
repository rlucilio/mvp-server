import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BenefitGateway } from '../gateways/benefit.gateway';

@Injectable()
export class FindBenefitService {
  private readonly logger = new Logger(FindBenefitService.name);
  constructor(private readonly benefitGateway: BenefitGateway) {}

  async execute(email: string) {
    this.logger.log('[BEGIN] find benefit');
    try {
      const result = await this.benefitGateway.getBenefitByEmail(email);

      return {
        answeredForm: result.benefit.answeredForm,
        id: result.benefit.id,
        birthDate: result.benefit.birthDate,
        body: result.benefit.body,
        emotional: result.benefit.emotional,
        questions: result.benefit.questions,
        email: result.user.email,
        urlPhoto: result.user.urlPhoto,
        gender: result.user.gender,
        name: result.user.name,
        phone: result.user.phone,
        plan: result.benefit.plan,
      };
    } catch (error) {
      this.logger.log('[END] find benefit');
      throw new HttpException('Benefit find benefit', HttpStatus.NOT_FOUND);
    }
  }
}
