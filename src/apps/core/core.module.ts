import { Module } from '@nestjs/common';
import { SharedModule } from './../shared/shared.module';
import { SequelizeConfigModule } from './modules/sequelize/sequelize-config.module';
import { GraphQLConfigModule } from './modules/graphql/graphql-config.module';
import { LoggerConfigModule } from './modules/logger/logger-config.module';
import { CoreUploadFileResolver } from './resolvers/core-upload.file.resolver';
import { CoreUploadFilesResolver } from './resolvers/core-upload.files.resolver';

@Module({
    imports: [
        GraphQLConfigModule,
        LoggerConfigModule,
        SequelizeConfigModule,
        SharedModule
    ],
    providers: [
        CoreUploadFileResolver,
        CoreUploadFilesResolver
    ]
})
export class CoreModule {}