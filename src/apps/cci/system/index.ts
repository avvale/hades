// controllers
import { CciCreateSystemController } from './controllers/cci-create-system.controller';
import { CciCreateSystemsController } from './controllers/cci-create-systems.controller';
import { CciPaginateSystemsController } from './controllers/cci-paginate-systems.controller';
import { CciGetSystemsController } from './controllers/cci-get-systems.controller';
import { CciFindSystemByIdController } from './controllers/cci-find-system-by-id.controller';
import { CciFindSystemController } from './controllers/cci-find-system.controller';
import { CciUpdateSystemController } from './controllers/cci-update-system.controller';
import { CciDeleteSystemByIdController } from './controllers/cci-delete-system-by-id.controller';
import { CciDeleteSystemsController } from './controllers/cci-delete-systems.controller';

// resolvers
import { CciCreateSystemResolver } from './resolvers/cci-create-system.resolver';
import { CciCreateSystemsResolver } from './resolvers/cci-create-systems.resolver';
import { CciPaginateSystemsResolver } from './resolvers/cci-paginate-systems.resolver';
import { CciGetSystemsResolver } from './resolvers/cci-get-systems.resolver';
import { CciFindSystemByIdResolver } from './resolvers/cci-find-system-by-id.resolver';
import { CciFindSystemResolver } from './resolvers/cci-find-system.resolver';
import { CciUpdateSystemResolver } from './resolvers/cci-update-system.resolver';
import { CciDeleteSystemByIdResolver } from './resolvers/cci-delete-system-by-id.resolver';
import { CciDeleteSystemsResolver } from './resolvers/cci-delete-systems.resolver';

export const CciSystemControllers = [
    CciCreateSystemController,
    CciCreateSystemsController,
    CciPaginateSystemsController,
    CciGetSystemsController,
    CciFindSystemByIdController,
    CciFindSystemController,
    CciUpdateSystemController,
    CciDeleteSystemByIdController,
    CciDeleteSystemsController,
];

export const CciSystemResolvers = [
    CciCreateSystemResolver,
    CciCreateSystemsResolver,
    CciPaginateSystemsResolver,
    CciGetSystemsResolver,
    CciFindSystemByIdResolver,
    CciFindSystemResolver,
    CciUpdateSystemResolver,
    CciDeleteSystemByIdResolver,
    CciDeleteSystemsResolver,
];