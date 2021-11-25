import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { ChangePassService } from '../services/change-pass.service';
import { CreateUserService } from '../services/create-user.service';
import { LoginUserService } from '../services/login-user.service';
import { ChangePassModel } from '../services/models/change-pass.model';
import { CreateUserModel } from '../services/models/create-user.model';
import { UserLoginModel } from '../services/models/login-user.model';
import { ChangePassDto } from './dtos/change-pass.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserLoginDto } from './dtos/user-login.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginUserService: LoginUserService,
    private readonly changePassService: ChangePassService,
  ) {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    await this.createUserService.execute(
      new CreateUserModel(dto.name, dto.email, dto.type, dto.birthDate),
    );
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() dto: UserLoginDto) {
    await this.loginUserService.execute(
      new UserLoginModel(dto.email, dto.pass),
    );
  }

  @Put('/change-pass')
  @HttpCode(HttpStatus.OK)
  async changePass(@Body() dto: ChangePassDto) {
    await this.changePassService.execute(
      new ChangePassModel(dto.email, dto.newPass),
    );
  }
}
