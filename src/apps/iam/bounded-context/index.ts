// controllers
import { CreateBoundedContextController } from './controllers/create-bounded-context.controller';
import { CreateBoundedContextsController } from './controllers/create-bounded-contexts.controller';
import { PaginateBoundedContextsController } from './controllers/paginate-bounded-contexts.controller';
import { GetBoundedContextsController } from './controllers/get-bounded-contexts.controller';
import { FindBoundedContextByIdController } from './controllers/find-bounded-context-by-id.controller';
import { FindBoundedContextController } from './controllers/find-bounded-context.controller';
import { UpdateBoundedContextController } from './controllers/update-bounded-context.controller';
import { DeleteBoundedContextByIdController } from './controllers/delete-bounded-context-by-id.controller';
import { DeleteBoundedContextsController } from './controllers/delete-bounded-contexts.controller';

// resolvers
import { CreateBoundedContextResolver } from './resolvers/create-bounded-context.resolver';
import { CreateBoundedContextsResolver } from './resolvers/create-bounded-contexts.resolver';
import { PaginateBoundedContextsResolver } from './resolvers/paginate-bounded-contexts.resolver';
import { GetBoundedContextsResolver } from './resolvers/get-bounded-contexts.resolver';
import { FindBoundedContextResolver } from './resolvers/find-bounded-context.resolver';
import { FindBoundedContextByIdResolver } from './resolvers/find-bounded-context-by-id.resolver';
import { UpdateBoundedContextResolver } from './resolvers/update-bounded-context.resolver';
import { DeleteBoundedContextByIdResolver } from './resolvers/delete-bounded-context-by-id.resolver';
import { DeleteBoundedContextsResolver } from './resolvers/delete-bounded-contexts.resolver';

export const IamBoundedContextControllers = [
    CreateBoundedContextController,
    CreateBoundedContextsController,
    PaginateBoundedContextsController,
    GetBoundedContextsController,
    FindBoundedContextByIdController,
    FindBoundedContextController,
    UpdateBoundedContextController,
    DeleteBoundedContextByIdController,
    DeleteBoundedContextsController,
];

export const IamBoundedContextResolvers = [
    CreateBoundedContextResolver,
    CreateBoundedContextsResolver,
    PaginateBoundedContextsResolver,
    GetBoundedContextsResolver,
    FindBoundedContextResolver,
    FindBoundedContextByIdResolver,
    UpdateBoundedContextResolver,
    DeleteBoundedContextByIdResolver,
    DeleteBoundedContextsResolver,
];