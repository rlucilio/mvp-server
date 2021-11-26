import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendEMailService {
  private readonly logger = new Logger(SendEMailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async execute<T>(
    email: string,
    subject: string,
    template: string,
    objParams?: T,
  ) {
    try {
      this.logger.log('[BEGIN] send email');
      this.logger.log(`To ${email}, template: ${template}`);
      await this.mailerService.sendMail({
        to: email,
        from: `"MVP novo serviço!" <${process.env.EMAIL_FROM}>`,
        subject: subject,
        template: `./${template}`,
        context: objParams ? objParams : {},
      });
    } catch (error) {
      this.logger.error(error.message);
      this.logger.log('[End] send email');
      throw error;
    }
  }
}
