import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {CreateUserDto} from "@common/lib/contracts";
import {IUser} from "@common/lib/interfaces";
import {NotificationService} from "../notifications/notification.service";

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_SERVICE') private readonly userClient: ClientProxy,
        private readonly notificationService: NotificationService,
    ) {}

    public async register(createUserDto: CreateUserDto): Promise<IUser>{
        const newUser: IUser =  await firstValueFrom(
            this.userClient.send('users_register', createUserDto),
        )

        await this.notificationService.pushNotificationAfterRegistration(newUser)
        return newUser
    }
}
