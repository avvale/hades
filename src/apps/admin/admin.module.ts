import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './../shared/shared.module';

import { AdminHandlers, AdminServices, AdminSchemas, AdminRepositories, AdminSagas } from '@hades/admin';

// controllers
import { CreateLangController } from './controllers/lang/create-lang.controller';
import { FindLangByIdController } from './controllers/lang/find-lang-by-id.controller';
import { FindLangController } from './controllers/lang/find-lang.controller';
import { UpdateLangController } from './controllers/lang/update-lang.controller';
import { DeleteLangController } from './controllers/lang/delete-lang.controller';

// resolvers
import { CreateLangResolver } from './resolvers/lang/create-lang.resolver';
import { FindLangResolver } from './resolvers/lang/find-lang.resolver';
import { FindLangByIdResolver } from './resolvers/lang/find-lang-by-id.resolver';
import { UpdateLangResolver } from './resolvers/lang/update-lang.resolver';
import { DeleteLangResolver } from './resolvers/lang/delete-lang.resolver';

@Module({
    imports: [
        SharedModule,
        TypeOrmModule.forFeature([
            ...AdminSchemas
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

        CreateLangResolver,
        FindLangResolver,
        FindLangByIdResolver,
        UpdateLangResolver,
        DeleteLangResolver
    ]
})
export class AdminModule {}
