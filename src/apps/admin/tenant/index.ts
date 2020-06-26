// controllers
import { CreateTenantController } from './controllers/create-tenant.controller';
import { InsertTenantsController } from './controllers/insert-tenants.controller';
import { PaginateTenantsController } from './controllers/paginate-tenants.controller';
import { GetTenantsController } from './controllers/get-tenants.controller';
import { FindTenantByIdController } from './controllers/find-tenant-by-id.controller';
import { FindTenantController } from './controllers/find-tenant.controller';
import { UpdateTenantController } from './controllers/update-tenant.controller';
import { DeleteTenantByIdController } from './controllers/delete-tenant-by-id.controller';
import { DeleteTenantsController } from './controllers/delete-tenants.controller';

// resolvers
import { CreateTenantResolver } from './resolvers/create-tenant.resolver';
import { InsertTenantsResolver } from './resolvers/insert-tenants.resolver';
import { PaginateTenantsResolver } from './resolvers/paginate-tenants.resolver';
import { GetTenantsResolver } from './resolvers/get-tenants.resolver';
import { FindTenantResolver } from './resolvers/find-tenant.resolver';
import { FindTenantByIdResolver } from './resolvers/find-tenant-by-id.resolver';
import { UpdateTenantResolver } from './resolvers/update-tenant.resolver';
import { DeleteTenantByIdResolver } from './resolvers/delete-tenant-by-id.resolver';
import { DeleteTenantsResolver } from './resolvers/delete-tenants.resolver';

export const AdminTenantControllers = [
    CreateTenantController,
    InsertTenantsController,
    PaginateTenantsController,
    GetTenantsController,
    FindTenantByIdController,
    FindTenantController,
    UpdateTenantController,
    DeleteTenantByIdController,
    DeleteTenantsController,
];

export const AdminTenantResolvers = [
    CreateTenantResolver,
    InsertTenantsResolver,
    PaginateTenantsResolver,
    GetTenantsResolver,
    FindTenantResolver,
    FindTenantByIdResolver,
    UpdateTenantResolver,
    DeleteTenantByIdResolver,
    DeleteTenantsResolver,
];