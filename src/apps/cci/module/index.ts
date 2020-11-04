// controllers
import { CciCreateModuleController } from './controllers/cci-create-module.controller';
import { CciCreateModulesController } from './controllers/cci-create-modules.controller';
import { CciPaginateModulesController } from './controllers/cci-paginate-modules.controller';
import { CciGetModulesController } from './controllers/cci-get-modules.controller';
import { CciFindModuleByIdController } from './controllers/cci-find-module-by-id.controller';
import { CciFindModuleController } from './controllers/cci-find-module.controller';
import { CciUpdateModuleController } from './controllers/cci-update-module.controller';
import { CciDeleteModuleByIdController } from './controllers/cci-delete-module-by-id.controller';
import { CciDeleteModulesController } from './controllers/cci-delete-modules.controller';

// resolvers
import { CciCreateModuleResolver } from './resolvers/cci-create-module.resolver';
import { CciCreateModulesResolver } from './resolvers/cci-create-modules.resolver';
import { CciPaginateModulesResolver } from './resolvers/cci-paginate-modules.resolver';
import { CciGetModulesResolver } from './resolvers/cci-get-modules.resolver';
import { CciFindModuleResolver } from './resolvers/cci-find-module.resolver';
import { CciFindModuleByIdResolver } from './resolvers/cci-find-module-by-id.resolver';
import { CciUpdateModuleResolver } from './resolvers/cci-update-module.resolver';
import { CciDeleteModuleByIdResolver } from './resolvers/cci-delete-module-by-id.resolver';
import { CciDeleteModulesResolver } from './resolvers/cci-delete-modules.resolver';

export const CciModuleControllers = [
    CciCreateModuleController,
    CciCreateModulesController,
    CciPaginateModulesController,
    CciGetModulesController,
    CciFindModuleByIdController,
    CciFindModuleController,
    CciUpdateModuleController,
    CciDeleteModuleByIdController,
    CciDeleteModulesController,
];

export const CciModuleResolvers = [
    CciCreateModuleResolver,
    CciCreateModulesResolver,
    CciPaginateModulesResolver,
    CciGetModulesResolver,
    CciFindModuleResolver,
    CciFindModuleByIdResolver,
    CciUpdateModuleResolver,
    CciDeleteModuleByIdResolver,
    CciDeleteModulesResolver,
];