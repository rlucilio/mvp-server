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
      this.logger.log('Try get user by email');
      user = await this.userGateway.findForEMail(model.email);
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.state === UserState.pending) {
      throw new HttpException(
        'Login not enabled',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    if (
      !(model.email === user.email && bcrypt.compareSync(model.pass, user.pass))
    ) {
      throw new HttpException('Login invalid', HttpStatus.BAD_REQUEST);
    }

    this.logger.log('[END] login user');
  }
}
