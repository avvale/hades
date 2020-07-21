// controllers
import { CreateRoleController } from './controllers/create-role.controller';
import { CreateRolesController } from './controllers/create-roles.controller';
import { PaginateRolesController } from './controllers/paginate-roles.controller';
import { GetRolesController } from './controllers/get-roles.controller';
import { FindRoleByIdController } from './controllers/find-role-by-id.controller';
import { FindRoleController } from './controllers/find-role.controller';
import { UpdateRoleController } from './controllers/update-role.controller';
import { DeleteRoleByIdController } from './controllers/delete-role-by-id.controller';
import { DeleteRolesController } from './controllers/delete-roles.controller';

// resolvers
import { CreateRoleResolver } from './resolvers/create-role.resolver';
import { CreateRolesResolver } from './resolvers/create-roles.resolver';
import { PaginateRolesResolver } from './resolvers/paginate-roles.resolver';
import { GetRolesResolver } from './resolvers/get-roles.resolver';
import { FindRoleResolver } from './resolvers/find-role.resolver';
import { FindRoleByIdResolver } from './resolvers/find-role-by-id.resolver';
import { UpdateRoleResolver } from './resolvers/update-role.resolver';
import { DeleteRoleByIdResolver } from './resolvers/delete-role-by-id.resolver';
import { DeleteRolesResolver } from './resolvers/delete-roles.resolver';

export const BplusItSappiRoleControllers = [
    CreateRoleController,
    CreateRolesController,
    PaginateRolesController,
    GetRolesController,
    FindRoleByIdController,
    FindRoleController,
    UpdateRoleController,
    DeleteRoleByIdController,
    DeleteRolesController,
];

export const BplusItSappiRoleResolvers = [
    CreateRoleResolver,
    CreateRolesResolver,
    PaginateRolesResolver,
    GetRolesResolver,
    FindRoleResolver,
    FindRoleByIdResolver,
    UpdateRoleResolver,
    DeleteRoleByIdResolver,
    DeleteRolesResolver,
];