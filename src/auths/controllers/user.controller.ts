import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../services/create-user.service';
import { CreateUserModel } from '../services/models/create-user.model';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    const model = new CreateUserModel();
    model.mail = dto.mail;
    model.name = dto.name;
    model.pass = dto.pass;
    model.type = dto.type;
    model.birthDate = dto.birthDate;

    await this.createUserService.execute(model);
  }
}
