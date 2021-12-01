import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt.guard';
import { UpdateProviderDto } from 'src/modules/provider/controllers/dtos/update-provider.dto';
import { UpdateProviderModel } from 'src/modules/provider/services/models/update-provider.model';
import { UpdateProviderService } from 'src/modules/provider/services/update-provider.service';

@Controller('provider')
export class ProviderController {
  constructor(private readonly updateProviderService: UpdateProviderService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  @HttpCode(HttpStatus.OK)
  async updateProvider(@Body() dto: UpdateProviderDto) {
    return await this.updateProviderService.execute(
      new UpdateProviderModel(dto.bio, dto.email),
    );
  }
}
