import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseMongoModule } from './configs/database-mongo/database-mongo.module';
import { HealthchecksModule } from './healthchecks/healthchecks.module';

@Module({
  imports: [DatabaseMongoModule, ConfigModule.forRoot(), HealthchecksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
