import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GenerateAccessTokenService } from './services/generate-access-token.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [GenerateAccessTokenService, JwtStrategy, JwtAuthGuard],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('SECRET_JWT'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  exports: [GenerateAccessTokenService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
