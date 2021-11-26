import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseMongoModule } from './configs/database-mongo/database-mongo.module';
import { HealthchecksModule } from './healthchecks/healthchecks.module';
import { UserModule } from './users/user.module';
import { EMailModule } from './email/email.module';
import { WppModule } from './wpp/wpp.module';

@Module({
  imports: [
    DatabaseMongoModule,
    ConfigModule.forRoot(),
    HealthchecksModule,
    UserModule,
    EMailModule,
    WppModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
