import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserState } from 'src/configs/database-mongo/schemas/enums/user-state.enum';
import { UserGateway } from '../gateways/user.gateway';
import { UserLoginModel } from './models/login-user.model';
import * as bcrypt from 'bcrypt';
import { User } from 'src/configs/database-mongo/schemas/user.schema';
import { GenerateAccessTokenService } from 'src/auth/services/generate-access-token.service';
import { GenerateTokenPayloadModel } from 'src/auth/services/models/generate-token-payload.model';
import { SendEMailService } from 'src/email/services/send-email.service';

@Injectable()
export class LoginUserService {
  private readonly logger = new Logger(LoginUserService.name);

  constructor(
    private readonly userGateway: UserGateway,
    private readonly generateAccessTokenService: GenerateAccessTokenService,
  ) {}

  async execute(model: UserLoginModel) {
    this.logger.log('[BEGIN] login user');
    let user: User & { _id: string };
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

    this.logger.log(user);
    this.logger.log('[END] login user');
    return {
      accessToken: this.generateAccessTokenService.execute(
        new GenerateTokenPayloadModel(user.name, user.email, user._id),
      ),
    };
  }
}
