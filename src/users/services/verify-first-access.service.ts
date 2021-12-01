import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import { UserState } from 'src/configs/database-mongo/schemas/enums/user-state.enum';
import { User } from 'src/configs/database-mongo/schemas/user.schema';

@Injectable()
export class VerifyFirstAccessService {
  private readonly logger = new Logger(VerifyFirstAccessService.name);
  constructor(private readonly userGateway: UserGateway) {}

  async execute(email: string) {
    this.logger.log('[BEGIN] verify first access');

    let user: User;
    try {
      this.logger.log('Try get user by email');
      user = await this.userGateway.findForEMail(email);
    } catch (error) {
      throw new HttpException(
        'Error in verify first login',
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log('[END] verify first access');
    return { result: user.state === UserState.pending };
  }
}
