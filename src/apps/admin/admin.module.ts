import { Module } from '@nestjs/common';
import { CreateLangController } from './controllers/lang/create-lang.controller';
import { FindLangController } from './controllers/lang/find-lang.controller';
import { AdminHandlers, AdminServices, AdminEntities, AdminRepositories, AdminSagas } from '../../@hades/admin';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './../shared/shared.module';

// resolvers
import { FindLangResolver } from './resolvers/lang/find-lang.resolver';
import { CreateLangResolver } from './resolvers/lang/create-lang.resolver';

@Module({
    imports: [
        SharedModule,
        TypeOrmModule.forFeature([
            ...AdminEntities
        ])
    ],
    controllers: [
        CreateLangController,
        FindLangController
    ],
    providers: [
        ...AdminHandlers,
        ...AdminServices,
        ...AdminRepositories,
        ...AdminSagas,

        FindLangResolver,
        CreateLangResolver
    ]
})
export class AdminModule {}
