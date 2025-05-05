import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const queue =  `users_queue`
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URL')],
      // urls: ['amqp://rabbitmq:5672'],
      queue: queue,
      queueOptions: { durable: false },

    },
  })

  await app.startAllMicroservices()
}
bootstrap();
