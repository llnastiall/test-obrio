import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export function createRabbitMQConfig(configService: ConfigService, queue:string): RmqOptions {
    return {
        transport: Transport.RMQ,
        options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: queue,
            queueOptions: {
                durable: false,
            },
        },
    };
}
