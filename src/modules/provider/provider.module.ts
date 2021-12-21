import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Benefit,
  BenefitSchema,
} from 'src/configs/database-mongo/schemas/benefit.schema';
import {
  Provider,
  ProvideSchema,
} from 'src/configs/database-mongo/schemas/provider.schema';
import {
  User,
  UserSchema,
} from 'src/configs/database-mongo/schemas/user.schema';
import { AuthModule } from 'src/core/auth/auth.module';
import { ProviderController } from './controllers/provider.controller';
import { ProviderGateway } from './gateways/provider.gateway';
import { FindProviderService } from './services/find-provider.service';
import { UpdateProviderService } from './services/update-provider.service';

@Module({
  controllers: [ProviderController],
  providers: [UpdateProviderService, ProviderGateway, FindProviderService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Provider.name, schema: ProvideSchema },
      { name: Benefit.name, schema: BenefitSchema },
    ]),
  ],
})
export class ProviderModule {}
