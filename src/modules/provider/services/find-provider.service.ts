import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ProviderGateway } from '../gateways/provider.gateway';

@Injectable()
export class FindProviderService {
  private readonly logger = new Logger(FindProviderService.name);
  constructor(private readonly providerGateway: ProviderGateway) {}

  async execute(email: string) {
    this.logger.log('[BEGIN] Find provider');

    try {
      const provider = await this.providerGateway.findProvider(email);

      this.logger.log('[END] Find provider');
      return {
        name: provider.user.name,
        specialty: provider.specialty,
        bio: provider.bio,
        email: provider.user.email,
        state: provider.user.state,
        urlPhoto: provider.user.urlPhoto,
        phone: provider.user.phone,
        gender: provider.user.gender,
      };
    } catch (error) {
      this.logger.warn(error.message);
      this.logger.warn('[END] Find provider');
      throw new HttpException('Error in find provider', HttpStatus.NOT_FOUND);
    }
  }
}
