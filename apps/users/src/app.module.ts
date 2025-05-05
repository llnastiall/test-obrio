import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('TYPEORM_HOST'),
        port: config.get<number>('TYPEORM_PORT'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: true,
      }),
    }),
    UsersModule,
  ],
})
export class AppModule {}
