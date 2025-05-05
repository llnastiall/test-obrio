import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "@common/lib/contracts";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    public async register(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = await this.userRepository.save({...createUserDto, password: hashedPassword});
        return this.userRepository.save(createdUser)

    }
}
