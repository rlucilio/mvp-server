import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt.guard';
import { UpdateProviderDto } from 'src/modules/provider/controllers/dtos/update-provider.dto';
import { UpdateProviderModel } from 'src/modules/provider/services/models/update-provider.model';
import { UpdateProviderService } from 'src/modules/provider/services/update-provider.service';
import { FindProviderService } from '../services/find-provider.service';
import { FindProviderDto } from './dtos/find-provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(
    private readonly updateProviderService: UpdateProviderService,
    private readonly findProviderService: FindProviderService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  @HttpCode(HttpStatus.OK)
  async updateProvider(@Body() dto: UpdateProviderDto) {
    return await this.updateProviderService.execute(
      new UpdateProviderModel(dto.bio, dto.email),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/find')
  @HttpCode(HttpStatus.OK)
  async findProvider(@Query() dto: FindProviderDto) {
    return await this.findProviderService.execute(dto.email);
  }
}
