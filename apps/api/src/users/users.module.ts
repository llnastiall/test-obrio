import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {RabbitMQModule} from "../rabbitmq/rabbitmq.module";
import {ConfigModule} from "@nestjs/config";
import {NotificationsModule} from "../notifications/notifications.module";

@Module({
  controllers: [UsersController],
  imports: [
    RabbitMQModule,
    ConfigModule,
    NotificationsModule
  ],
  providers: [UsersService],
})
export class UsersModule {}
