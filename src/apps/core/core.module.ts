import { Module } from '@nestjs/common';
import { SharedModule } from './../shared/shared.module';
import { SequelizeConfigModule } from './modules/sequelize-config.module';
import { GraphQLConfigModule } from './modules/graphql/graphql-config.module';

@Module({
    imports: [
        SharedModule,
        GraphQLConfigModule,
        SequelizeConfigModule
    ],
})
export class CoreModule {};