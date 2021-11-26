import { Global, Module, Provider } from '@nestjs/common';
import { SendWppService } from './services/send-wpp.service';
import * as venom from 'venom-bot';

@Global()
@Module({
  imports: [],
  providers: [SendWppService],
})
export class WppModule {
  private static client: venom.Whatsapp;
  static async forRoot() {
    const providers: Provider[] = [
      {
        provide: 'CLIENT_WPP',
        useFactory: async () =>
          await venom.create({
            session: 'session-name',
            disableWelcome: true,
            multidevice: false,
            autoClose: 0,
          }),
      },
      {
        provide: SendWppService,
        useClass: SendWppService,
      },
    ];
    return {
      module: WppModule,
      providers,
      exports: providers,
    };
  }
}
