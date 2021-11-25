import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import { ChangePassModel } from './models/change-pass.model';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/shared/consts';

@Injectable()
export class ChangePassService {
  private readonly logger = new Logger(ChangePassService.name);

  constructor(private readonly userGateway: UserGateway) {}

  async execute(model: ChangePassModel) {
    this.logger.log('[BEGIN] change pass');

    try {
      this.logger.log('Try get user by email');
      const user = await this.userGateway.findForEMail(model.email);

      if (bcrypt.compareSync(model.oldPass, user.pass)) {
        await this.userGateway.changePass(
          user._id,
          bcrypt.hashSync(model.newPass, saltOrRounds),
        );
      } else {
        throw new HttpException('Error in change pass', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Error in change pass', HttpStatus.BAD_REQUEST);
    }

    this.logger.log('[BEGIN] change pass');
  }
}
