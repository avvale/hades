// controllers
import { CreateFlowController } from './controllers/create-flow.controller';
import { CreateFlowsController } from './controllers/create-flows.controller';
import { PaginateFlowsController } from './controllers/paginate-flows.controller';
import { GetFlowsController } from './controllers/get-flows.controller';
import { FindFlowByIdController } from './controllers/find-flow-by-id.controller';
import { FindFlowController } from './controllers/find-flow.controller';
import { UpdateFlowController } from './controllers/update-flow.controller';
import { DeleteFlowByIdController } from './controllers/delete-flow-by-id.controller';
import { DeleteFlowsController } from './controllers/delete-flows.controller';

// resolvers
import { CreateFlowResolver } from './resolvers/create-flow.resolver';
import { CreateFlowsResolver } from './resolvers/create-flows.resolver';
import { PaginateFlowsResolver } from './resolvers/paginate-flows.resolver';
import { GetFlowsResolver } from './resolvers/get-flows.resolver';
import { FindFlowResolver } from './resolvers/find-flow.resolver';
import { FindFlowByIdResolver } from './resolvers/find-flow-by-id.resolver';
import { UpdateFlowResolver } from './resolvers/update-flow.resolver';
import { DeleteFlowByIdResolver } from './resolvers/delete-flow-by-id.resolver';
import { DeleteFlowsResolver } from './resolvers/delete-flows.resolver';

export const BplusItSappiFlowControllers = [
    CreateFlowController,
    CreateFlowsController,
    PaginateFlowsController,
    GetFlowsController,
    FindFlowByIdController,
    FindFlowController,
    UpdateFlowController,
    DeleteFlowByIdController,
    DeleteFlowsController,
];

export const BplusItSappiFlowResolvers = [
    CreateFlowResolver,
    CreateFlowsResolver,
    PaginateFlowsResolver,
    GetFlowsResolver,
    FindFlowResolver,
    FindFlowByIdResolver,
    UpdateFlowResolver,
    DeleteFlowByIdResolver,
    DeleteFlowsResolver,
];