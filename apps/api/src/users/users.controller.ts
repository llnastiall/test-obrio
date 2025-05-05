import {Controller, Post, Body, HttpStatus, HttpCode} from '@nestjs/common';
import { UsersService } from './users.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {CreateUserDto} from "@common/lib/contracts";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Registration to app' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(201)
  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
}
