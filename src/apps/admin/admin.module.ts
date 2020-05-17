import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './../shared/shared.module';

import { AdminHandlers, AdminServices, AdminEntities, AdminRepositories, AdminSagas } from '@hades/admin';

// controllers
import { CreateLangController } from './controllers/lang/create-lang.controller';
import { FindLangByIdController } from './controllers/lang/find-lang-by-id.controller';
import { FindLangController } from './controllers/lang/find-lang.controller';
import { UpdateLangController } from './controllers/lang/update-lang.controller';
import { DeleteLangController } from './controllers/lang/delete-lang.controller';

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
        FindLangByIdController,
        FindLangController,
        UpdateLangController,
        DeleteLangController
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
