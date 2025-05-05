import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import axios from 'axios';
import {Process} from "@nestjs/bull";
import {ConfigService} from "@nestjs/config";


@Processor('push')
export class NotificationsProcessor extends WorkerHost {
    constructor(private readonly configService: ConfigService) {
        super();
    }
    @Process('send-registration-reminder')
    async process(job: Job<any, any, string>) {
        const { userId, name } = job.data;
        const webhookUrl = this.configService.get<string>('WEBHOOK_URL');

        await axios.post(webhookUrl, {
            message: `Hello ${name}, it's been 24 hours since you joined!`,
            userId,
        });
        return { status: 'sent' };
    }
}
