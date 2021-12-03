import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { UpdateBenefitModel } from '../services/models/update-benefit.model';
import { UpdateBenefitService } from '../services/update-benefit.service';
import { UpdateBenefitDto } from './dtos/update-benefit.dto';

@Controller('benefit')
export class BenefitController {
  constructor(private readonly updateBenefitService: UpdateBenefitService) {}

  @Put('/update')
  @HttpCode(HttpStatus.OK)
  async updateBenefit(@Body() dto: UpdateBenefitDto) {
    return await this.updateBenefitService.execute(
      new UpdateBenefitModel(dto.email, dto.dateBirth, dto.weight, dto.height),
    );
  }
}