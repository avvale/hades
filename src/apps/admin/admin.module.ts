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
import { CreateTenantController } from './tenant/controllers/create-tenant.controller';
import { InsertTenantsController } from './tenant/controllers/insert-tenants.controller';
import { PaginateTenantsController } from './tenant/controllers/paginate-tenants.controller';
import { GetTenantsController } from './tenant/controllers/get-tenants.controller';
import { FindTenantByIdController } from './tenant/controllers/find-tenant-by-id.controller';
import { FindTenantController } from './tenant/controllers/find-tenant.controller';
import { UpdateTenantController } from './tenant/controllers/update-tenant.controller';
import { DeleteTenantByIdController } from './tenant/controllers/delete-tenant-by-id.controller';
import { DeleteTenantsController } from './tenant/controllers/delete-tenants.controller';
import { CreateTenantResolver } from './tenant/resolvers/create-tenant.resolver';
import { InsertTenantsResolver } from './tenant/resolvers/insert-tenants.resolver';
import { PaginateTenantsResolver } from './tenant/resolvers/paginate-tenants.resolver';
import { GetTenantsResolver } from './tenant/resolvers/get-tenants.resolver';
import { FindTenantByIdResolver } from './tenant/resolvers/find-tenant-by-id.resolver';
import { FindTenantResolver } from './tenant/resolvers/find-tenant.resolver';
import { UpdateTenantResolver } from './tenant/resolvers/update-tenant.resolver';
import { DeleteTenantByIdResolver } from './tenant/resolvers/delete-tenant-by-id.resolver';
import { DeleteTenantsResolver } from './tenant/resolvers/delete-tenants.resolver';

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
        CreateTenantController,
        InsertTenantsController,
        PaginateTenantsController,
        GetTenantsController,
        FindTenantByIdController,
        FindTenantController,
        UpdateTenantController,
        DeleteTenantByIdController,
        DeleteTenantsController
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
        CreateTenantResolver,
        InsertTenantsResolver,
        PaginateTenantsResolver,
        GetTenantsResolver,
        FindTenantByIdResolver,
        FindTenantResolver,
        UpdateTenantResolver,
        DeleteTenantByIdResolver,
        DeleteTenantsResolver
    ]
})
export class AdminModule {}
