// controllers
import { CreateActionController } from './controllers/create-action.controller';
import { CreateActionsController } from './controllers/create-actions.controller';
import { PaginateActionsController } from './controllers/paginate-actions.controller';
import { GetActionsController } from './controllers/get-actions.controller';
import { FindActionByIdController } from './controllers/find-action-by-id.controller';
import { FindActionController } from './controllers/find-action.controller';
import { UpdateActionController } from './controllers/update-action.controller';
import { DeleteActionByIdController } from './controllers/delete-action-by-id.controller';
import { DeleteActionsController } from './controllers/delete-actions.controller';

// resolvers
import { CreateActionResolver } from './resolvers/create-action.resolver';
import { CreateActionsResolver } from './resolvers/create-actions.resolver';
import { PaginateActionsResolver } from './resolvers/paginate-actions.resolver';
import { GetActionsResolver } from './resolvers/get-actions.resolver';
import { FindActionResolver } from './resolvers/find-action.resolver';
import { FindActionByIdResolver } from './resolvers/find-action-by-id.resolver';
import { UpdateActionResolver } from './resolvers/update-action.resolver';
import { DeleteActionByIdResolver } from './resolvers/delete-action-by-id.resolver';
import { DeleteActionsResolver } from './resolvers/delete-actions.resolver';

export const NfcActionControllers = [
    CreateActionController,
    CreateActionsController,
    PaginateActionsController,
    GetActionsController,
    FindActionByIdController,
    FindActionController,
    UpdateActionController,
    DeleteActionByIdController,
    DeleteActionsController,
];

export const NfcActionResolvers = [
    CreateActionResolver,
    CreateActionsResolver,
    PaginateActionsResolver,
    GetActionsResolver,
    FindActionResolver,
    FindActionByIdResolver,
    UpdateActionResolver,
    DeleteActionByIdResolver,
    DeleteActionsResolver,
];