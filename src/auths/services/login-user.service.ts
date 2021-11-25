import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserState } from 'src/configs/database-mongo/schemas/enums/user-state.enum';
import { UserGateway } from '../gateways/user.gateway';
import { UserLoginModel } from './models/login-user.model';
import * as bcrypt from 'bcrypt';
import { User } from 'src/configs/database-mongo/schemas/user.schema';

@Injectable()
export class LoginUserService {
  private readonly logger = new Logger(LoginUserService.name);

  constructor(private readonly userGateway: UserGateway) {}

  async execute(model: UserLoginModel) {
    this.logger.log('[BEGIN] login user');

    let user: User;
    try {
      user = await this.userGateway.findForMail(model.mail);
    } catch (error) {
      throw new HttpException('Login invalid', HttpStatus.BAD_REQUEST);
    }

    if (!model.firstAccess && !model.pass) {
      throw new HttpException('Pass required', HttpStatus.BAD_REQUEST);
    }

    if (model.firstAccess && user.state === UserState.pending) {
      return;
    }

    if (
      !(model.mail === user.mail && bcrypt.compareSync(model.pass, user.pass))
    ) {
      throw new HttpException('Login invalid', HttpStatus.BAD_REQUEST);
    }

    this.logger.log(user);
    this.logger.log('[END] login user');
  }
}
