import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenPayloadModel } from './models/generate-token-payload.model';

@Injectable()
export class GenerateAccessTokenService {
  private readonly logger = new Logger(GenerateAccessTokenService.name);
  constructor(private readonly jwtService: JwtService) {}

  execute(model: GenerateTokenPayloadModel) {
    this.logger.log('[BEGIN] generate access token');
    this.logger.log('[END] generate access token');
    const payload = { email: model.email, name: model.name, _id: model.id };

    return this.jwtService.sign(payload);
  }
}
