import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseMongoModule } from './configs/database-mongo/database-mongo.module';
import { HealthchecksModule } from './core/healthchecks/healthchecks.module';
import { UserModule } from './modules/users/user.module';
import { EMailModule } from './core/email/email.module';
import { BenefitModule } from './modules/benefit/benefit.module';
import { ProviderModule } from './modules/provider/provider.module';

@Module({
  imports: [
    DatabaseMongoModule,
    ConfigModule.forRoot(),
    HealthchecksModule,
    UserModule,
    EMailModule,
    BenefitModule,
    ProviderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
