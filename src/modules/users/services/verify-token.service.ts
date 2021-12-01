import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import { VerifyTokenModel } from './models/verify-token.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VerifyTokenService {
  private readonly logger = new Logger(VerifyTokenService.name);

  constructor(private readonly userGateway: UserGateway) {}

  async execute(model: VerifyTokenModel) {
    this.logger.log('[BEGIN] verify token change pass');

    try {
      this.logger.log('Try get user by email');
      const user = await this.userGateway.findForEMail(model.email);

      this.logger.log('[END] verify first access');
      return { result: bcrypt.compareSync(model.token, user.pass) };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error in verify token change pass',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
