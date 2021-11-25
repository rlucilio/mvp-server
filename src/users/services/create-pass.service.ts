import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/shared/consts';
import { UserState } from 'src/configs/database-mongo/schemas/enums/user-state.enum';
import { CreatePassModel } from './models/create-pass.model';

@Injectable()
export class CreatePassService {
  private readonly logger = new Logger(CreatePassService.name);

  constructor(private readonly userGateway: UserGateway) {}

  async execute(model: CreatePassModel) {
    this.logger.log('[BEGIN] create pass');

    try {
      this.logger.log('Try get user by email');
      const user = await this.userGateway.findForEMail(model.email);

      if (user.state === UserState.pending) {
        await this.userGateway.changePassAndState(
          user._id,
          bcrypt.hashSync(model.newPass, SALT_OR_ROUNDS),
          UserState.activated,
        );
      } else {
        throw new HttpException('Error in create pass', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Error in create pass', HttpStatus.BAD_REQUEST);
    }

    this.logger.log('[END] create pass');
  }
}
