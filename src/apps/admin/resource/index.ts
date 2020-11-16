// controllers
import { AdminCreateResourceController } from './controllers/admin-create-resource.controller';
import { AdminCreateResourcesController } from './controllers/admin-create-resources.controller';
import { AdminPaginateResourcesController } from './controllers/admin-paginate-resources.controller';
import { AdminGetResourcesController } from './controllers/admin-get-resources.controller';
import { AdminFindResourceByIdController } from './controllers/admin-find-resource-by-id.controller';
import { AdminFindResourceController } from './controllers/admin-find-resource.controller';
import { AdminUpdateResourceController } from './controllers/admin-update-resource.controller';
import { AdminDeleteResourceByIdController } from './controllers/admin-delete-resource-by-id.controller';
import { AdminDeleteResourcesController } from './controllers/admin-delete-resources.controller';

// resolvers
import { AdminCreateResourceResolver } from './resolvers/admin-create-resource.resolver';
import { AdminCreateResourcesResolver } from './resolvers/admin-create-resources.resolver';
import { AdminPaginateResourcesResolver } from './resolvers/admin-paginate-resources.resolver';
import { AdminGetResourcesResolver } from './resolvers/admin-get-resources.resolver';
import { AdminFindResourceResolver } from './resolvers/admin-find-resource.resolver';
import { AdminFindResourceByIdResolver } from './resolvers/admin-find-resource-by-id.resolver';
import { AdminUpdateResourceResolver } from './resolvers/admin-update-resource.resolver';
import { AdminDeleteResourceByIdResolver } from './resolvers/admin-delete-resource-by-id.resolver';
import { AdminDeleteResourcesResolver } from './resolvers/admin-delete-resources.resolver';

export const AdminResourceControllers = [
    AdminCreateResourceController,
    AdminCreateResourcesController,
    AdminPaginateResourcesController,
    AdminGetResourcesController,
    AdminFindResourceByIdController,
    AdminFindResourceController,
    AdminUpdateResourceController,
    AdminDeleteResourceByIdController,
    AdminDeleteResourcesController,
];

export const AdminResourceResolvers = [
    AdminCreateResourceResolver,
    AdminCreateResourcesResolver,
    AdminPaginateResourcesResolver,
    AdminGetResourcesResolver,
    AdminFindResourceResolver,
    AdminFindResourceByIdResolver,
    AdminUpdateResourceResolver,
    AdminDeleteResourceByIdResolver,
    AdminDeleteResourcesResolver,
];