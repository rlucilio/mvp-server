import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateProviderModel } from 'src/modules/provider/services/models/update-provider.model';
import { UpdateProviderService } from 'src/modules/provider/services/update-provider.service';
import { FindProviderService } from '../services/find-provider.service';
import { FindProviderDto } from './dtos/find-provider.dto';
import { UpdateProviderDto } from './dtos/update-provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(
    private readonly updateProviderService: UpdateProviderService,
    private readonly findProviderService: FindProviderService,
  ) {}

  @Put('/update')
  @HttpCode(HttpStatus.OK)
  async updateProvider(@Body() dto: UpdateProviderDto) {
    return await this.updateProviderService.execute(
      new UpdateProviderModel(dto.bio, dto.email),
    );
  }

  @Get('/find')
  @HttpCode(HttpStatus.OK)
  async findProvider(@Query() dto: FindProviderDto) {
    return await this.findProviderService.execute(dto.email);
  }
}
