// controllers
import { CciCreateRoleController } from './controllers/cci-create-role.controller';
import { CciCreateRolesController } from './controllers/cci-create-roles.controller';
import { CciPaginateRolesController } from './controllers/cci-paginate-roles.controller';
import { CciGetRolesController } from './controllers/cci-get-roles.controller';
import { CciFindRoleByIdController } from './controllers/cci-find-role-by-id.controller';
import { CciFindRoleController } from './controllers/cci-find-role.controller';
import { CciUpdateRoleController } from './controllers/cci-update-role.controller';
import { CciDeleteRoleByIdController } from './controllers/cci-delete-role-by-id.controller';
import { CciDeleteRolesController } from './controllers/cci-delete-roles.controller';

// resolvers
import { CciCreateRoleResolver } from './resolvers/cci-create-role.resolver';
import { CciCreateRolesResolver } from './resolvers/cci-create-roles.resolver';
import { CciPaginateRolesResolver } from './resolvers/cci-paginate-roles.resolver';
import { CciGetRolesResolver } from './resolvers/cci-get-roles.resolver';
import { CciFindRoleByIdResolver } from './resolvers/cci-find-role-by-id.resolver';
import { CciFindRoleResolver } from './resolvers/cci-find-role.resolver';
import { CciUpdateRoleResolver } from './resolvers/cci-update-role.resolver';
import { CciDeleteRoleByIdResolver } from './resolvers/cci-delete-role-by-id.resolver';
import { CciDeleteRolesResolver } from './resolvers/cci-delete-roles.resolver';

export const CciRoleControllers = [
    CciCreateRoleController,
    CciCreateRolesController,
    CciPaginateRolesController,
    CciGetRolesController,
    CciFindRoleByIdController,
    CciFindRoleController,
    CciUpdateRoleController,
    CciDeleteRoleByIdController,
    CciDeleteRolesController,
];

export const CciRoleResolvers = [
    CciCreateRoleResolver,
    CciCreateRolesResolver,
    CciPaginateRolesResolver,
    CciGetRolesResolver,
    CciFindRoleByIdResolver,
    CciFindRoleResolver,
    CciUpdateRoleResolver,
    CciDeleteRoleByIdResolver,
    CciDeleteRolesResolver,
];