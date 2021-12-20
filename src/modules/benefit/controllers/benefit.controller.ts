import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FindBenefitService } from '../services/find-benefit.service';
import { QuestionsModel } from '../services/models/questions.model';
import { UpdateBenefitModel } from '../services/models/update-benefit.model';
import { SetAnswerFormService } from '../services/set-answer-form.service';
import { SetEmotionalService } from '../services/set-emotional/set-emotional.service';
import { UpdateBenefitService } from '../services/update-benefit.service';
import { FindBenefitDto } from './dtos/find-benefit.dto';
import { QuestionsDto } from './dtos/questions.dto';
import { SetEmotionalDto } from './dtos/set-emotional.dto';
import { UpdateBenefitDto } from './dtos/update-benefit.dto';

@Controller('benefit')
export class BenefitController {
  constructor(
    private readonly updateBenefitService: UpdateBenefitService,
    private readonly setAsw: SetAnswerFormService,
    private readonly findBenefit: FindBenefitService,
    private readonly setEmotional: SetEmotionalService,
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

  @Get('/find')
  async verifyAswForm(@Query() dto: FindBenefitDto) {
    return this.findBenefit.execute(dto.email);
  }

  @Put('/emotional')
  async updateEmotional(@Body() dto: SetEmotionalDto) {
    await this.setEmotional.execute(dto.email, dto.nps);
  }
}
