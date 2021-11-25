import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import { UserState } from 'src/configs/database-mongo/schemas/enums/user-state.enum';

@Injectable()
export class VerifyFirstAccessService {
  private readonly logger = new Logger(VerifyFirstAccessService.name);
  constructor(private readonly userGateway: UserGateway) {}

  async execute(email: string) {
    this.logger.log('[BEGIN] verify first access');

    try {
      this.logger.log('Try get user by email');
      const user = await this.userGateway.findForEMail(email);

      this.logger.log('[BEGIN] verify first access');
      return { result: user.state === UserState.pending };
    } catch (error) {
      throw new HttpException(
        'Error in request change pass',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
