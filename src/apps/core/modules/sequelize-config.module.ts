import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnvironmentService } from '@hades/shared/domain/environment/environment.service';
import { EnvironmentModule } from './../../shared/modules/environment.module';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [EnvironmentModule],
            useFactory: (environmentService: EnvironmentService) => ({
                dialect: 'mysql',
                host: environmentService.get<string>('DATABASE_HOST'),
                port: +environmentService.get<number>('DATABASE_PORT'),
                username: environmentService.get<string>('DATABASE_USER'),
                password: environmentService.get<string>('DATABASE_PASSWORD'),
                database: environmentService.get<string>('DATABASE_SCHEMA'),
                synchronize: environmentService.get<boolean>('DATABASE_SYNCHRONIZE'),
                logging: environmentService.get<string>('DATABASE_LOGGIN') === 'true' ? console.log : false,
                autoLoadModels: true,
                models: [],
            }),
            inject: [EnvironmentService]
        })
    ],
    exports: [
        SequelizeModule
    ]
})
export class SequelizeConfigModule {}