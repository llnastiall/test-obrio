import {Injectable} from '@nestjs/common';
import {IUser} from "@common/lib/interfaces";
import {Queue} from "bullmq";
import {InjectQueue} from "@nestjs/bullmq";

@Injectable()
export class NotificationService {
    constructor(
        @InjectQueue('push') private audioQueue: Queue
    ) {}

    public async pushNotificationAfterRegistration(newUser: IUser){
        await this.audioQueue.add('send-registration-reminder', {
            userId: newUser.id,
            name: newUser.name},
        {
            delay: 24 * 60 * 60 * 1000,
        }
        );

    }
}
