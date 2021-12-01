import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserGateway } from '../gateways/user.gateway';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/shared/consts';
import { SendEMailService } from 'src/core/email/services/send-email.service';
import { SendWppService } from 'src/core/wpp/services/send-wpp.service';
import { CHANGE_PASS_WPP } from 'src/core/wpp/templates/change-pass';

@Injectable()
export class RequestChangePassService {
  private readonly logger = new Logger(RequestChangePassService.name);
  constructor(
    private readonly userGateway: UserGateway,
    private readonly sendEmailService: SendEMailService,
    private readonly sendWppService: SendWppService,
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

      await this.sendEmailService.execute(email, 'teste', 'change-pass', {
        name: user.name,
        url: `${process.env.URL_FRONT}/auth/change-pass?token=${temporaryPass}&email=${email}`,
      });

      if (user.phone) {
        const template = CHANGE_PASS_WPP.replace('{{name}}', user.name).replace(
          '{{url}}',
          `${process.env.URL_FRONT}/auth/change-pass?token=${temporaryPass}&email=${email}`,
        );
        await this.sendWppService.execute(user.phone, template);
      }

      this.logger.log('[END] request change pass');
    } catch (error) {
      throw new HttpException(
        'Error in request change pass',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
