import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/shared/consts';

@Injectable()
export class RequestChangePassService {
  private readonly logger = new Logger(RequestChangePassService.name);
  constructor(private readonly userGateway: UserGateway) {}

  async execute(email: string) {
    this.logger.log('[BEGIN] request change pass');

    try {
      this.logger.log('Try get user by email');
      const user = await this.userGateway.findForEMail(email);

      const temporaryPass = uuid.v1();
      await this.userGateway.changePass(
        user._id,
        bcrypt.hashSync(temporaryPass, saltOrRounds),
      );

      return temporaryPass;
    } catch (error) {
      throw new HttpException(
        'Error in request change pass',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.log('[BEGIN] request change pass');
  }
}
