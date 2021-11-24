import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpLogInterceptor } from './configs/log/http-log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpLogInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
