import { Module } from '@nestjs/common'
import {ClientsModule} from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {createRabbitMQConfig} from "@common/lib/configs";

@Module({
    imports: [
        ConfigModule,
        ClientsModule.registerAsync([
            {
                name: 'USERS_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) =>
                    createRabbitMQConfig(configService, `users_queue`),
            }
        ]),
    ],
    exports: [ClientsModule],
})
export class RabbitMQModule {}
