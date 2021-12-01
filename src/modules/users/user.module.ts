import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from 'src/configs/database-mongo/schemas/user.schema';
import {
  Benefit,
  BenefitSchema,
} from 'src/configs/database-mongo/schemas/benefit.schema';
import {
  Provider,
  ProvideSchema,
} from 'src/configs/database-mongo/schemas/provider.schema';
import { UserGateway } from './gateways/user.gateway';
import { CreateUserService } from './services/create-user.service';
import { LoginUserService } from './services/login-user.service';
import { ChangePassService } from './services/change-pass.service';
import { RequestChangePassService } from './services/request-change-pass.service';
import { VerifyFirstAccessService } from './services/verify-first-access.service';
import { UpdateUserService } from './services/update-user.service';
import { AuthModule } from 'src/core/auth/auth.module';
import { VerifyTokenService } from './services/verify-token.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    UserGateway,
    LoginUserService,
    ChangePassService,
    RequestChangePassService,
    VerifyFirstAccessService,
    UpdateUserService,
    VerifyTokenService,
  ],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Benefit.name, schema: BenefitSchema },
      { name: Provider.name, schema: ProvideSchema },
    ]),
  ],
})
export class UserModule {}
