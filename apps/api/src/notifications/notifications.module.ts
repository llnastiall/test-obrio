import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {BullModule} from "@nestjs/bullmq";
import {NotificationsProcessor} from "./notifications.processor";
import {NotificationService} from "./notification.service";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'push',
        }),
        ConfigModule,
    ],
    providers: [NotificationsProcessor, NotificationService],
    exports: [NotificationService],
})
export class NotificationsModule {}
