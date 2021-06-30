import { Module } from '@nestjs/common';
import { SharedModule } from './../shared/shared.module';
import { SequelizeConfigModule } from './modules/sequelize/sequelize-config.module';
import { GraphQLConfigModule } from './modules/graphql/graphql-config.module';
import { LoggerConfigModule } from './modules/logger/logger-config.module';
import { CorePreparationRequestController } from './gcp/controllers/core-preparation-request.controller';

@Module({
    imports: [
        GraphQLConfigModule,
        LoggerConfigModule,
        SequelizeConfigModule,
        SharedModule
    ],
    controllers: [
        CorePreparationRequestController
    ],
})
export class CoreModule {}