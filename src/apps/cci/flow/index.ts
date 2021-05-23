// controllers
import { CciCreateFlowController } from './controllers/cci-create-flow.controller';
import { CciCreateFlowsController } from './controllers/cci-create-flows.controller';
import { CciPaginateFlowsController } from './controllers/cci-paginate-flows.controller';
import { CciGetFlowsController } from './controllers/cci-get-flows.controller';
import { CciFindFlowByIdController } from './controllers/cci-find-flow-by-id.controller';
import { CciFindFlowController } from './controllers/cci-find-flow.controller';
import { CciUpdateFlowController } from './controllers/cci-update-flow.controller';
import { CciDeleteFlowByIdController } from './controllers/cci-delete-flow-by-id.controller';
import { CciDeleteFlowsController } from './controllers/cci-delete-flows.controller';

// resolvers
import { CciCreateFlowResolver } from './resolvers/cci-create-flow.resolver';
import { CciCreateFlowsResolver } from './resolvers/cci-create-flows.resolver';
import { CciPaginateFlowsResolver } from './resolvers/cci-paginate-flows.resolver';
import { CciGetFlowsResolver } from './resolvers/cci-get-flows.resolver';
import { CciFindFlowByIdResolver } from './resolvers/cci-find-flow-by-id.resolver';
import { CciFindFlowResolver } from './resolvers/cci-find-flow.resolver';
import { CciUpdateFlowResolver } from './resolvers/cci-update-flow.resolver';
import { CciDeleteFlowByIdResolver } from './resolvers/cci-delete-flow-by-id.resolver';
import { CciDeleteFlowsResolver } from './resolvers/cci-delete-flows.resolver';

export const CciFlowControllers = [
    CciCreateFlowController,
    CciCreateFlowsController,
    CciPaginateFlowsController,
    CciGetFlowsController,
    CciFindFlowByIdController,
    CciFindFlowController,
    CciUpdateFlowController,
    CciDeleteFlowByIdController,
    CciDeleteFlowsController,
];

export const CciFlowResolvers = [
    CciCreateFlowResolver,
    CciCreateFlowsResolver,
    CciPaginateFlowsResolver,
    CciGetFlowsResolver,
    CciFindFlowByIdResolver,
    CciFindFlowResolver,
    CciUpdateFlowResolver,
    CciDeleteFlowByIdResolver,
    CciDeleteFlowsResolver,
];