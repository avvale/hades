import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './../shared/shared.module';

import { AdminHandlers, AdminServices, AdminEntities, AdminRepositories, AdminSagas } from '@hades/admin';

// controllers
import { CreateLangController } from './controllers/lang/create-lang.controller';
import { FindLangIdController } from './controllers/lang/find-lang-id.controller';
import { FindLangController } from './controllers/lang/find-lang.controller';
import { UpdateLangController } from './controllers/lang/update-lang.controller';

// resolvers
import { CreateLangResolver } from './resolvers/lang/create-lang.resolver';
import { FindLangResolver } from './resolvers/lang/find-lang.resolver';
import { FindLangIdResolver } from './resolvers/lang/find-lang-id.resolver';

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
        UpdateLangController
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
