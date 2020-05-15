import { Module } from '@nestjs/common';
import { CreateLangController } from './controllers/lang/create-lang.controller';
import { FindLangIdController } from './controllers/lang/find-lang-id.controller';
import { FindLangController } from './controllers/lang/find-lang.controller';
import { AdminHandlers, AdminServices, AdminEntities, AdminRepositories, AdminSagas } from '../../@hades/admin';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './../shared/shared.module';

// resolvers
import { FindLangResolver } from './resolvers/lang/find-lang.resolver';
import { FindLangIdResolver } from './resolvers/lang/find-lang-id.resolver';
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
        FindLangIdController,
        FindLangController,
    ],
    providers: [
        ...AdminHandlers,
        ...AdminServices,
        ...AdminRepositories,
        ...AdminSagas,

        FindLangResolver,
        FindLangIdResolver,
        CreateLangResolver
    ]
})
export class AdminModule {}
