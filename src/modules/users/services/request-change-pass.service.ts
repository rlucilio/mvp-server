import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/shared/consts';
import { SendEMailService } from 'src/core/email/services/send-email.service';

@Injectable()
export class RequestChangePassService {
  private readonly logger = new Logger(RequestChangePassService.name);
  constructor(
    private readonly userGateway: UserGateway,
    private readonly sendEmailService: SendEMailService,
  ) {}

  async execute(email: string) {
    this.logger.log('[BEGIN] request change pass');

    try {
      this.logger.log('Try get user by email');
      const user = await this.userGateway.findForEMail(email);

      const temporaryPass = uuid.v1();
      await this.userGateway.changePassAndState(
        user._id,
        bcrypt.hashSync(temporaryPass, SALT_OR_ROUNDS),
      );

      await this.sendEmailService.execute(email, 'teste', 'basic-with-btn', {
        url: `${process.env.URL_FRONT}/auth/change-pass?token=${temporaryPass}&email=${email}`,
        title: `Vamos resetar a sua senha`,
        content: `${user.name}, Click no botão abaixo para alterar a sua senha`,
        textLabel: 'Trocar senha',
      });

      this.logger.log('[END] request change pass');
    } catch (error) {
      throw new HttpException(
        'Error in request change pass',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
