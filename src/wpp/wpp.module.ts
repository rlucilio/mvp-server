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
          process.env.OS_ENV === 'prd'
            ? await venom
                .create({
                  session: 'MVP Novo produto',
                  disableWelcome: true,
                  multidevice: false,
                  autoClose: 0,
                  folderNameToken: './tokens',
                })
                .catch(console.log)
            : {
                sendText: (...args: any[]) => console.log(args),
              },
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
