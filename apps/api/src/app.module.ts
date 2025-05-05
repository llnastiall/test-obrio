import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "./users/users.module";
import {RabbitMQModule} from "./rabbitmq/rabbitmq.module";
import {BullModule} from "@nestjs/bullmq";
import {NotificationsModule} from "./notifications/notifications.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  BullModule.forRoot({
    connection: {
      host: 'redis',
      port: 6379,
    },
  }),
    NotificationsModule,
    RabbitMQModule,
    UsersModule,
  ],
})
export class AppModule {}
