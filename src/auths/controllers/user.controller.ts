import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserService } from '../services/create-user.service';
import { LoginUserService } from '../services/login-user.service';
import { CreateUserModel } from '../services/models/create-user.model';
import { UserLoginModel } from '../services/models/login-user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserLoginDto } from './dtos/user-login.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginUserService: LoginUserService,
  ) {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    await this.createUserService.execute(
      new CreateUserModel(dto.name, dto.mail, dto.type, dto.birthDate),
    );
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() dto: UserLoginDto) {
    await this.loginUserService.execute(
      new UserLoginModel(dto.mail, dto.pass, dto.firstAccess),
    );
  }
}
