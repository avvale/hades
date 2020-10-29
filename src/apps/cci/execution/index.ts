// controllers
import { CciCreateExecutionController } from './controllers/cci-create-execution.controller';
import { CciCreateExecutionsController } from './controllers/cci-create-executions.controller';
import { CciPaginateExecutionsController } from './controllers/cci-paginate-executions.controller';
import { CciGetExecutionsController } from './controllers/cci-get-executions.controller';
import { CciFindExecutionByIdController } from './controllers/cci-find-execution-by-id.controller';
import { CciFindExecutionController } from './controllers/cci-find-execution.controller';
import { CciUpdateExecutionController } from './controllers/cci-update-execution.controller';
import { CciDeleteExecutionByIdController } from './controllers/cci-delete-execution-by-id.controller';
import { CciDeleteExecutionsController } from './controllers/cci-delete-executions.controller';

// resolvers
import { CciCreateExecutionResolver } from './resolvers/cci-create-execution.resolver';
import { CciCreateExecutionsResolver } from './resolvers/cci-create-executions.resolver';
import { CciPaginateExecutionsResolver } from './resolvers/cci-paginate-executions.resolver';
import { CciGetExecutionsResolver } from './resolvers/cci-get-executions.resolver';
import { CciFindExecutionResolver } from './resolvers/cci-find-execution.resolver';
import { CciFindExecutionByIdResolver } from './resolvers/cci-find-execution-by-id.resolver';
import { CciUpdateExecutionResolver } from './resolvers/cci-update-execution.resolver';
import { CciDeleteExecutionByIdResolver } from './resolvers/cci-delete-execution-by-id.resolver';
import { CciDeleteExecutionsResolver } from './resolvers/cci-delete-executions.resolver';

export const CciExecutionControllers = [
    CciCreateExecutionController,
    CciCreateExecutionsController,
    CciPaginateExecutionsController,
    CciGetExecutionsController,
    CciFindExecutionByIdController,
    CciFindExecutionController,
    CciUpdateExecutionController,
    CciDeleteExecutionByIdController,
    CciDeleteExecutionsController,
];

export const CciExecutionResolvers = [
    CciCreateExecutionResolver,
    CciCreateExecutionsResolver,
    CciPaginateExecutionsResolver,
    CciGetExecutionsResolver,
    CciFindExecutionResolver,
    CciFindExecutionByIdResolver,
    CciUpdateExecutionResolver,
    CciDeleteExecutionByIdResolver,
    CciDeleteExecutionsResolver,
];