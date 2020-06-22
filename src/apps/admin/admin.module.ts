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
import { CreateTenantController } from './controllers/tenant/create-tenant.controller';
import { InsertTenantsController } from './controllers/tenant/insert-tenants.controller';
import { PaginateTenantsController } from './controllers/tenant/paginate-tenants.controller';
import { GetTenantsController } from './controllers/tenant/get-tenants.controller';
import { FindTenantByIdController } from './controllers/tenant/find-tenant-by-id.controller';
import { FindTenantController } from './controllers/tenant/find-tenant.controller';
import { UpdateTenantController } from './controllers/tenant/update-tenant.controller';
import { DeleteTenantByIdController } from './controllers/tenant/delete-tenant-by-id.controller';
import { DeleteTenantsController } from './controllers/tenant/delete-tenants.controller';
import { CreateTenantResolver } from './resolvers/tenant/create-tenant.resolver';
import { InsertTenantsResolver } from './resolvers/tenant/insert-tenants.resolver';
import { PaginateTenantsResolver } from './resolvers/tenant/paginate-tenants.resolver';
import { GetTenantsResolver } from './resolvers/tenant/get-tenants.resolver';
import { FindTenantByIdResolver } from './resolvers/tenant/find-tenant-by-id.resolver';
import { FindTenantResolver } from './resolvers/tenant/find-tenant.resolver';
import { UpdateTenantResolver } from './resolvers/tenant/update-tenant.resolver';
import { DeleteTenantByIdResolver } from './resolvers/tenant/delete-tenant-by-id.resolver';
import { DeleteTenantsResolver } from './resolvers/tenant/delete-tenants.resolver';

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
