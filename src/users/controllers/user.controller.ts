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
import { CreatePassService } from '../services/create-pass.service';
import { CreateUserService } from '../services/create-user.service';
import { LoginUserService } from '../services/login-user.service';
import { ChangePassModel } from '../services/models/change-pass.model';
import { CreatePassModel } from '../services/models/create-pass.model';
import { CreateUserModel } from '../services/models/create-user.model';
import { UserLoginModel } from '../services/models/login-user.model';
import { RequestChangePassService } from '../services/request-change-pass.service';
import { VerifyFirstAccessService } from '../services/verify-first-access.service';
import { ChangePassDto } from './dtos/change-pass.dto';
import { CreatePassDto } from './dtos/create-pass.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { RequestChangePassDto } from './dtos/request-change-pass.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { VerifyFirstAccessDto } from './dtos/verify-first-access';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginUserService: LoginUserService,
    private readonly changePassService: ChangePassService,
    private readonly requestChangePassService: RequestChangePassService,
    private readonly verifyFirstAccessService: VerifyFirstAccessService,
    private readonly createPassService: CreatePassService,
  ) {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    await this.createUserService.execute(
      new CreateUserModel(
        dto.name,
        dto.email,
        dto.type,
        dto.birthDate,
        dto.key,
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

  @Put('/create-pass')
  @HttpCode(HttpStatus.OK)
  async createPass(@Body() dto: CreatePassDto) {
    await this.createPassService.execute(
      new CreatePassModel(dto.email, dto.newPass),
    );
  }
}
