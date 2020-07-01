// controllers
import { CreatePermissionController } from './controllers/create-permission.controller';
import { InsertPermissionsController } from './controllers/insert-permissions.controller';
import { PaginatePermissionsController } from './controllers/paginate-permissions.controller';
import { GetPermissionsController } from './controllers/get-permissions.controller';
import { FindPermissionByIdController } from './controllers/find-permission-by-id.controller';
import { FindPermissionController } from './controllers/find-permission.controller';
import { UpdatePermissionController } from './controllers/update-permission.controller';
import { DeletePermissionByIdController } from './controllers/delete-permission-by-id.controller';
import { DeletePermissionsController } from './controllers/delete-permissions.controller';

// resolvers
import { CreatePermissionResolver } from './resolvers/create-permission.resolver';
import { InsertPermissionsResolver } from './resolvers/insert-permissions.resolver';
import { PaginatePermissionsResolver } from './resolvers/paginate-permissions.resolver';
import { GetPermissionsResolver } from './resolvers/get-permissions.resolver';
import { FindPermissionResolver } from './resolvers/find-permission.resolver';
import { FindPermissionByIdResolver } from './resolvers/find-permission-by-id.resolver';
import { UpdatePermissionResolver } from './resolvers/update-permission.resolver';
import { DeletePermissionByIdResolver } from './resolvers/delete-permission-by-id.resolver';
import { DeletePermissionsResolver } from './resolvers/delete-permissions.resolver';

export const AdminPermissionControllers = [
    CreatePermissionController,
    InsertPermissionsController,
    PaginatePermissionsController,
    GetPermissionsController,
    FindPermissionByIdController,
    FindPermissionController,
    UpdatePermissionController,
    DeletePermissionByIdController,
    DeletePermissionsController,
];

export const AdminPermissionResolvers = [
    CreatePermissionResolver,
    InsertPermissionsResolver,
    PaginatePermissionsResolver,
    GetPermissionsResolver,
    FindPermissionResolver,
    FindPermissionByIdResolver,
    UpdatePermissionResolver,
    DeletePermissionByIdResolver,
    DeletePermissionsResolver,
];