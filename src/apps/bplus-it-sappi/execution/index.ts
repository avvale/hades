// controllers
import { CreateExecutionController } from './controllers/create-execution.controller';
import { InsertExecutionsController } from './controllers/insert-executions.controller';
import { PaginateExecutionsController } from './controllers/paginate-executions.controller';
import { GetExecutionsController } from './controllers/get-executions.controller';
import { FindExecutionByIdController } from './controllers/find-execution-by-id.controller';
import { FindExecutionController } from './controllers/find-execution.controller';
import { UpdateExecutionController } from './controllers/update-execution.controller';
import { DeleteExecutionByIdController } from './controllers/delete-execution-by-id.controller';
import { DeleteExecutionsController } from './controllers/delete-executions.controller';

// resolvers
import { CreateExecutionResolver } from './resolvers/create-execution.resolver';
import { InsertExecutionsResolver } from './resolvers/insert-executions.resolver';
import { PaginateExecutionsResolver } from './resolvers/paginate-executions.resolver';
import { GetExecutionsResolver } from './resolvers/get-executions.resolver';
import { FindExecutionResolver } from './resolvers/find-execution.resolver';
import { FindExecutionByIdResolver } from './resolvers/find-execution-by-id.resolver';
import { UpdateExecutionResolver } from './resolvers/update-execution.resolver';
import { DeleteExecutionByIdResolver } from './resolvers/delete-execution-by-id.resolver';
import { DeleteExecutionsResolver } from './resolvers/delete-executions.resolver';

export const BplusItSappiExecutionControllers = [
    CreateExecutionController,
    InsertExecutionsController,
    PaginateExecutionsController,
    GetExecutionsController,
    FindExecutionByIdController,
    FindExecutionController,
    UpdateExecutionController,
    DeleteExecutionByIdController,
    DeleteExecutionsController,
];

export const BplusItSappiExecutionResolvers = [
    CreateExecutionResolver,
    InsertExecutionsResolver,
    PaginateExecutionsResolver,
    GetExecutionsResolver,
    FindExecutionResolver,
    FindExecutionByIdResolver,
    UpdateExecutionResolver,
    DeleteExecutionByIdResolver,
    DeleteExecutionsResolver,
];