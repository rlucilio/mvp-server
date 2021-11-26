import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendEMailService {
  constructor(private readonly mailerService: MailerService) {}

  async execute<T>(
    email: string,
    subject: string,
    template: string,
    objParams?: T,
  ) {
    await this.mailerService.sendMail({
      to: email,
      from: `"MVP novo serviço!" <${process.env.EMAIL_FROM}>`,
      subject: subject,
      template: `./${template}`,
      context: objParams ? objParams : {},
    });
  }
}
