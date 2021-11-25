import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseMongoModule } from './configs/database-mongo/database-mongo.module';
import { HealthchecksModule } from './healthchecks/healthchecks.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    DatabaseMongoModule,
    ConfigModule.forRoot(),
    HealthchecksModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
