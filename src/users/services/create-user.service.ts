import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SendEMailService } from 'src/email/services/send-email.service';
import { SendWppService } from 'src/wpp/services/send-wpp.service';
import { CONFIRMATION_WPP } from 'src/wpp/templates/confirmation.wpp';
import { UserGateway } from '../gateways/user.gateway';
import { CreateUserModel } from './models/create-user.model';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);
  constructor(
    private readonly userGateway: UserGateway,
    private readonly sendEmailService: SendEMailService,
    private readonly sendWppService: SendWppService,
  ) {}

  async execute(model: CreateUserModel) {
    try {
      if (model.key !== process.env.KEY_CREATE_USER) {
        throw new HttpException('Key invalid', HttpStatus.BAD_REQUEST);
      }
      this.logger.log('[BEGIN] Create user');

      if (model.type === 'BENEFIT') {
        this.logger.log('Create benefit');
        await this.userGateway.creteBenefit(model);
      } else {
        this.logger.log('Create provider');
        await this.userGateway.createProvider(model);
      }

      await this.sendEmailService.execute(
        model.email,
        'teste',
        'confirmation',
        {
          name: model.name,
          url: `${process.env.URL_FRONT}/auth/login`,
        },
      );

      if (model.phone) {
        const template = CONFIRMATION_WPP.replace(
          '{{name}}',
          model.name,
        ).replace('{{url}}', `${process.env.URL_FRONT}/auth/login`);

        await this.sendWppService.execute(model.phone, template);
      }

      this.logger.log('[END] Create user');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: error.message,
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
