import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BenefitGateway } from '../gateways/benefit.gateway';
import { QuestionsModel } from './models/questions.model';

@Injectable()
export class SetAnswerFormService {
  private readonly logger = new Logger(SetAnswerFormService.name);
  constructor(private readonly benefitGateway: BenefitGateway) {}

  async execute(model: QuestionsModel) {
    this.logger.log('[BEGIN] Set answer form');
    try {
      const questionEmail = model.questions.find(
        (quest) => quest.question.toLowerCase() === 'e-mail',
      );

      if (questionEmail) {
        this.benefitGateway.setAswForm(
          questionEmail.answer,
          model.questions.length > 1,
        );
      } else {
        throw new HttpException('Benefit not asw email', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      this.logger.log('[END] Set answer form');
      throw new HttpException('Benefit not found', HttpStatus.NOT_FOUND);
    }
    this.logger.log('[END] Set answer form');
  }
}
