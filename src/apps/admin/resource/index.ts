// controllers
import { CreateResourceController } from './controllers/create-resource.controller';
import { InsertResourcesController } from './controllers/insert-resources.controller';
import { PaginateResourcesController } from './controllers/paginate-resources.controller';
import { GetResourcesController } from './controllers/get-resources.controller';
import { FindResourceByIdController } from './controllers/find-resource-by-id.controller';
import { FindResourceController } from './controllers/find-resource.controller';
import { UpdateResourceController } from './controllers/update-resource.controller';
import { DeleteResourceByIdController } from './controllers/delete-resource-by-id.controller';
import { DeleteResourcesController } from './controllers/delete-resources.controller';

// resolvers
import { CreateResourceResolver } from './resolvers/create-resource.resolver';
import { InsertResourcesResolver } from './resolvers/insert-resources.resolver';
import { PaginateResourcesResolver } from './resolvers/paginate-resources.resolver';
import { GetResourcesResolver } from './resolvers/get-resources.resolver';
import { FindResourceResolver } from './resolvers/find-resource.resolver';
import { FindResourceByIdResolver } from './resolvers/find-resource-by-id.resolver';
import { UpdateResourceResolver } from './resolvers/update-resource.resolver';
import { DeleteResourceByIdResolver } from './resolvers/delete-resource-by-id.resolver';
import { DeleteResourcesResolver } from './resolvers/delete-resources.resolver';

export const AdminResourceControllers = [
    CreateResourceController,
    InsertResourcesController,
    PaginateResourcesController,
    GetResourcesController,
    FindResourceByIdController,
    FindResourceController,
    UpdateResourceController,
    DeleteResourceByIdController,
    DeleteResourcesController,
];

export const AdminResourceResolvers = [
    CreateResourceResolver,
    InsertResourcesResolver,
    PaginateResourcesResolver,
    GetResourcesResolver,
    FindResourceResolver,
    FindResourceByIdResolver,
    UpdateResourceResolver,
    DeleteResourceByIdResolver,
    DeleteResourcesResolver,
];