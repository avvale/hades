// controllers
import { CreateModuleController } from './controllers/create-module.controller';
import { CreateModulesController } from './controllers/create-modules.controller';
import { PaginateModulesController } from './controllers/paginate-modules.controller';
import { GetModulesController } from './controllers/get-modules.controller';
import { FindModuleByIdController } from './controllers/find-module-by-id.controller';
import { FindModuleController } from './controllers/find-module.controller';
import { UpdateModuleController } from './controllers/update-module.controller';
import { DeleteModuleByIdController } from './controllers/delete-module-by-id.controller';
import { DeleteModulesController } from './controllers/delete-modules.controller';

// resolvers
import { CreateModuleResolver } from './resolvers/create-module.resolver';
import { CreateModulesResolver } from './resolvers/create-modules.resolver';
import { PaginateModulesResolver } from './resolvers/paginate-modules.resolver';
import { GetModulesResolver } from './resolvers/get-modules.resolver';
import { FindModuleResolver } from './resolvers/find-module.resolver';
import { FindModuleByIdResolver } from './resolvers/find-module-by-id.resolver';
import { UpdateModuleResolver } from './resolvers/update-module.resolver';
import { DeleteModuleByIdResolver } from './resolvers/delete-module-by-id.resolver';
import { DeleteModulesResolver } from './resolvers/delete-modules.resolver';

export const BplusItSappiModuleControllers = [
    CreateModuleController,
    CreateModulesController,
    PaginateModulesController,
    GetModulesController,
    FindModuleByIdController,
    FindModuleController,
    UpdateModuleController,
    DeleteModuleByIdController,
    DeleteModulesController,
];

export const BplusItSappiModuleResolvers = [
    CreateModuleResolver,
    CreateModulesResolver,
    PaginateModulesResolver,
    GetModulesResolver,
    FindModuleResolver,
    FindModuleByIdResolver,
    UpdateModuleResolver,
    DeleteModuleByIdResolver,
    DeleteModulesResolver,
];