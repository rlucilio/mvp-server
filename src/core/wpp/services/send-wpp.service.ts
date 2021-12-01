import { Inject, Injectable, Logger } from '@nestjs/common';
import * as venom from 'venom-bot';

@Injectable()
export class SendWppService {
  private readonly logger = new Logger(SendWppService.name);

  constructor(
    @Inject('CLIENT_WPP') private readonly clientWpp: venom.Whatsapp,
  ) {}

  async execute(contact: string, template: string) {
    try {
      this.logger.log('[BEGIN] send whatsapp');
      this.logger.log(`Contact: ${contact}, template: ${template}`);
      await this.clientWpp.sendText(`55${contact}@c.us`, template);
      this.logger.log('[END] send whatsapp');
    } catch (error) {
      this.logger.error(error.message);
      this.logger.log('[END] send whatsapp');
      throw error;
    }
  }
}
