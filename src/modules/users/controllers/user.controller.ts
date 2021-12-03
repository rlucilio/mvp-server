import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ChangePassService } from '../services/change-pass.service';
import { UpdateUserService } from '../services/update-user.service';
import { CreateUserService } from '../services/create-user.service';
import { LoginUserService } from '../services/login-user.service';
import { ChangePassModel } from '../services/models/change-pass.model';
import { UpdateUserModel } from '../services/models/update-user.model';
import { CreateUserModel } from '../services/models/create-user.model';
import { UserLoginModel } from '../services/models/login-user.model';
import { VerifyTokenModel } from '../services/models/verify-token.model';
import { RequestChangePassService } from '../services/request-change-pass.service';
import { VerifyFirstAccessService } from '../services/verify-first-access.service';
import { VerifyTokenService } from '../services/verify-token.service';
import { ChangePassDto } from './dtos/change-pass.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { RequestChangePassDto } from './dtos/request-change-pass.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { VerifyFirstAccessDto } from './dtos/verify-first-access';
import { VerifyTokenDto } from './dtos/verify-token.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginUserService: LoginUserService,
    private readonly changePassService: ChangePassService,
    private readonly requestChangePassService: RequestChangePassService,
    private readonly verifyFirstAccessService: VerifyFirstAccessService,
    private readonly createPassService: UpdateUserService,
    private readonly verifyTokenService: VerifyTokenService,
  ) {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    await this.createUserService.execute(
      new CreateUserModel(
        dto.name,
        dto.email,
        dto.type,
        dto.key,
        dto.specialty,
      ),
    );
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() dto: UserLoginDto, @Res() response: Response) {
    const result = await this.loginUserService.execute(
      new UserLoginModel(dto.email, dto.pass),
    );

    response
      .header('x-access-token', result.accessToken)
      .header('Access-Control-Expose-Headers', 'x-access-token')
      .end();
  }

  @Put('/change-pass')
  @HttpCode(HttpStatus.OK)
  async changePass(@Body() dto: ChangePassDto) {
    await this.changePassService.execute(
      new ChangePassModel(dto.email, dto.newPass, dto.oldPass),
    );
  }

  @Put('/request-change-pass')
  @HttpCode(HttpStatus.OK)
  async requestChangePassword(@Body() dto: RequestChangePassDto) {
    return await this.requestChangePassService.execute(dto.email);
  }

  @Get('/is-first-login')
  async verifyFirstLogin(@Query() dto: VerifyFirstAccessDto) {
    return await this.verifyFirstAccessService.execute(dto.email);
  }

  @Put('/update')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() dto: UpdateUserDto) {
    await this.createPassService.execute(
      new UpdateUserModel(
        dto.oldEmail,
        dto.newEmail,
        dto.newPass,
        dto.name,
        dto.mobilePhone,
        dto.acceptTerm,
        dto.gender,
      ),
    );
  }

  @Get('/verify-token-change-pass')
  @HttpCode(HttpStatus.OK)
  async verifyTokenChangePass(@Query() dto: VerifyTokenDto) {
    return await this.verifyTokenService.execute(
      new VerifyTokenModel(dto.email, dto.token),
    );
  }

  // @Get('/get')
  // @UseGuards(JwtAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // async getProvider(@Body() dto: UpdateProviderDto) {
  //   return await this.updateProviderService.execute(
  //     new UpdateProviderModel(dto.bio, dto.email),
  //   );
  // }
}
