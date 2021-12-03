import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { QuestionsModel } from '../services/models/questions.model';
import { UpdateBenefitModel } from '../services/models/update-benefit.model';
import { SetAnswerFormService } from '../services/set-answer-form.service';
import { UpdateBenefitService } from '../services/update-benefit.service';
import { QuestionsDto } from './dtos/questions.dto';
import { UpdateBenefitDto } from './dtos/update-benefit.dto';

@Controller('benefit')
export class BenefitController {
  constructor(
    private readonly updateBenefitService: UpdateBenefitService,
    private readonly setAsw: SetAnswerFormService,
  ) {}

  @Put('/update')
  @HttpCode(HttpStatus.OK)
  async updateBenefit(@Body() dto: UpdateBenefitDto) {
    return await this.updateBenefitService.execute(
      new UpdateBenefitModel(dto.email, dto.dateBirth, dto.weight, dto.height),
    );
  }

  @Post('/set-form')
  async setFormBenefit(@Body() dto: QuestionsDto) {
    await this.setAsw.execute(new QuestionsModel(dto.questions));
  }
}
