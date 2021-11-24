import { Module } from '@nestjs/common';
import { DatabaseMongoModule } from './database-mongo/database-mongo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseMongoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
