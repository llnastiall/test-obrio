import {IsString, MinLength, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {Match} from "../decorators/match.decorator";

export class CreateUserDto{
    @ApiProperty({ example: 'User', description: 'User`s name' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'P@ssword', description: 'User`s password' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'P@ssword', description: 'Confirm password' })
    @IsString()
    @MinLength(6)
    @Match('password', { message: 'Passwords do not match' })
    confirmPassword: string;
}