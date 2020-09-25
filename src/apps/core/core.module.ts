import { Module } from '@nestjs/common';
import { SharedModule } from './../shared/shared.module';
import { SequelizeConfigModule } from './modules/sequelize/sequelize-config.module';
import { GraphQLConfigModule } from './modules/graphql/graphql-config.module';
import { LoggerConfigModule } from './modules/logger/logger-config.module';
import { JwtConfigModule } from './modules/jwt/jwt-config.module';

@Module({
    imports: [
        SharedModule,
        GraphQLConfigModule,
        SequelizeConfigModule,
        LoggerConfigModule,
        JwtConfigModule
    ]
})
export class CoreModule 
{}