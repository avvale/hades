// controllers
import { CreateSystemController } from './controllers/create-system.controller';
import { CreateSystemsController } from './controllers/create-systems.controller';
import { PaginateSystemsController } from './controllers/paginate-systems.controller';
import { GetSystemsController } from './controllers/get-systems.controller';
import { FindSystemByIdController } from './controllers/find-system-by-id.controller';
import { FindSystemController } from './controllers/find-system.controller';
import { UpdateSystemController } from './controllers/update-system.controller';
import { DeleteSystemByIdController } from './controllers/delete-system-by-id.controller';
import { DeleteSystemsController } from './controllers/delete-systems.controller';

// resolvers
import { CreateSystemResolver } from './resolvers/create-system.resolver';
import { CreateSystemsResolver } from './resolvers/create-systems.resolver';
import { PaginateSystemsResolver } from './resolvers/paginate-systems.resolver';
import { GetSystemsResolver } from './resolvers/get-systems.resolver';
import { FindSystemResolver } from './resolvers/find-system.resolver';
import { FindSystemByIdResolver } from './resolvers/find-system-by-id.resolver';
import { UpdateSystemResolver } from './resolvers/update-system.resolver';
import { DeleteSystemByIdResolver } from './resolvers/delete-system-by-id.resolver';
import { DeleteSystemsResolver } from './resolvers/delete-systems.resolver';

export const BplusItSappiSystemControllers = [
    CreateSystemController,
    CreateSystemsController,
    PaginateSystemsController,
    GetSystemsController,
    FindSystemByIdController,
    FindSystemController,
    UpdateSystemController,
    DeleteSystemByIdController,
    DeleteSystemsController,
];

export const BplusItSappiSystemResolvers = [
    CreateSystemResolver,
    CreateSystemsResolver,
    PaginateSystemsResolver,
    GetSystemsResolver,
    FindSystemResolver,
    FindSystemByIdResolver,
    UpdateSystemResolver,
    DeleteSystemByIdResolver,
    DeleteSystemsResolver,
];