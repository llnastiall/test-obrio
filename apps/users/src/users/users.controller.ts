import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {CreateUserDto} from "@common/lib/contracts";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @MessagePattern('users_register')
  async register(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto)
  }
}
