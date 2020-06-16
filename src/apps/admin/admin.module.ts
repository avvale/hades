import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';

import { AdminHandlers, AdminServices, AdminModels, AdminRepositories, AdminSagas } from '@hades/admin';

// controllers
import { CreateLangController } from './controllers/lang/create-lang.controller';
import { InsertLangsController } from './controllers/lang/insert-langs.controller';
import { PaginateLangsController } from './controllers/lang/paginate-langs.controller';
import { GetLangsController } from './controllers/lang/get-langs.controller';
import { FindLangByIdController } from './controllers/lang/find-lang-by-id.controller';
import { FindLangController } from './controllers/lang/find-lang.controller';
import { UpdateLangController } from './controllers/lang/update-lang.controller';
import { DeleteLangByIdController } from './controllers/lang/delete-lang-by-id.controller';
import { DeleteLangsController } from './controllers/lang/delete-langs.controller';

// resolvers
import { CreateLangResolver } from './resolvers/lang/create-lang.resolver';
import { InsertLangsResolver } from './resolvers/lang/insert-langs.resolver';
import { PaginateLangsResolver } from './resolvers/lang/paginate-langs.resolver';
import { GetLangsResolver } from './resolvers/lang/get-langs.resolver';
import { FindLangResolver } from './resolvers/lang/find-lang.resolver';
import { FindLangByIdResolver } from './resolvers/lang/find-lang-by-id.resolver';
import { UpdateLangResolver } from './resolvers/lang/update-lang.resolver';
import { DeleteLangByIdResolver } from './resolvers/lang/delete-lang-by-id.resolver';
import { DeleteLangsResolver } from './resolvers/lang/delete-langs.resolver';

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
