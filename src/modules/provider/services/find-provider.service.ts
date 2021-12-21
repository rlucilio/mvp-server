import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ProviderGateway } from '../gateways/provider.gateway';

@Injectable()
export class FindProviderService {
  private readonly logger = new Logger(FindProviderService.name);
  constructor(private readonly providerGateway: ProviderGateway) {}

  async execute(email: string) {
    this.logger.log('[BEGIN] Find provider');

    try {
      const result = await this.providerGateway.findProvider(email);

      this.logger.log('[END] Find provider');
      return {
        name: result.user.name,
        specialty: result.provider.specialty,
        bio: result.provider.bio,
        email: result.user.email,
        state: result.user.state,
        urlPhoto: result.user.urlPhoto,
        phone: result.user.phone,
        gender: result.user.gender,
        benefits: result.provider.benefits,
      };
    } catch (error) {
      this.logger.warn(error.message);
      this.logger.warn('[END] Find provider');
      throw new HttpException('Error in find provider', HttpStatus.NOT_FOUND);
    }
  }
}
