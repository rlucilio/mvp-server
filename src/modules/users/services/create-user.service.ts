import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { isIn } from 'class-validator';
import { SendEMailService } from 'src/core/email/services/send-email.service';
import { SendWppService } from 'src/core/wpp/services/send-wpp.service';
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

        if (
          isIn(model.specialty, [
            'ENFERMEIRA',
            'MEDICO',
            'NUTRICIONISTA',
            'EDUCADOR_FISICO',
          ])
        ) {
          await this.userGateway.createProvider(model);
        } else {
          throw new HttpException('Specialty invalid', HttpStatus.BAD_REQUEST);
        }
      }

      await this.sendEmailService.execute(
        model.email,
        'Confirmação de cadastro',
        'confirmation',
        {
          name: model.name,
          url: `${process.env.URL_FRONT}/auth/register-pass/${model.email}?user=${model.type}`,
        },
      );

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
