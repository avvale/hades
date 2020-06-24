import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';

import { AdminHandlers, AdminServices, AdminModels, AdminRepositories, AdminSagas } from '@hades/admin';

// controllers
import { CreateLangController } from './lang/controllers/create-lang.controller';
import { InsertLangsController } from './lang/controllers/insert-langs.controller';
import { PaginateLangsController } from './lang/controllers/paginate-langs.controller';
import { GetLangsController } from './lang/controllers/get-langs.controller';
import { FindLangByIdController } from './lang/controllers/find-lang-by-id.controller';
import { FindLangController } from './lang/controllers/find-lang.controller';
import { UpdateLangController } from './lang/controllers/update-lang.controller';
import { DeleteLangByIdController } from './lang/controllers/delete-lang-by-id.controller';
import { DeleteLangsController } from './lang/controllers/delete-langs.controller';

// resolvers
import { CreateLangResolver } from './lang/resolvers/create-lang.resolver';
import { InsertLangsResolver } from './lang/resolvers/insert-langs.resolver';
import { PaginateLangsResolver } from './lang/resolvers/paginate-langs.resolver';
import { GetLangsResolver } from './lang/resolvers/get-langs.resolver';
import { FindLangResolver } from './lang/resolvers/find-lang.resolver';
import { FindLangByIdResolver } from './lang/resolvers/find-lang-by-id.resolver';
import { UpdateLangResolver } from './lang/resolvers/update-lang.resolver';
import { DeleteLangByIdResolver } from './lang/resolvers/delete-lang-by-id.resolver';
import { DeleteLangsResolver } from './lang/resolvers/delete-langs.resolver';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...AdminModels
        ])
    ],
    controllers: [
        CreateLangController,
        InsertLangsController,
        PaginateLangsController,
        GetLangsController,
        FindLangByIdController,
        FindLangController,
        UpdateLangController,
        DeleteLangByIdController,
        DeleteLangsController,
    ],
    providers: [
        ...AdminHandlers,
        ...AdminServices,
        ...AdminRepositories,
        ...AdminSagas,

        CreateLangResolver,
        InsertLangsResolver,
        PaginateLangsResolver,
        GetLangsResolver,
        FindLangResolver,
        FindLangByIdResolver,
        UpdateLangResolver,
        DeleteLangByIdResolver,
        DeleteLangsResolver,
    ]
})
export class AdminModule {}
