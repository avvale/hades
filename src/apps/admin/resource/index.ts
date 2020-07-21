// controllers
import { CreateResourceController } from './controllers/create-resource.controller';
import { CreateResourcesController } from './controllers/create-resources.controller';
import { PaginateResourcesController } from './controllers/paginate-resources.controller';
import { GetResourcesController } from './controllers/get-resources.controller';
import { FindResourceByIdController } from './controllers/find-resource-by-id.controller';
import { FindResourceController } from './controllers/find-resource.controller';
import { UpdateResourceController } from './controllers/update-resource.controller';
import { DeleteResourceByIdController } from './controllers/delete-resource-by-id.controller';
import { DeleteResourcesController } from './controllers/delete-resources.controller';

// resolvers
import { CreateResourceResolver } from './resolvers/create-resource.resolver';
import { CreateResourcesResolver } from './resolvers/create-resources.resolver';
import { PaginateResourcesResolver } from './resolvers/paginate-resources.resolver';
import { GetResourcesResolver } from './resolvers/get-resources.resolver';
import { FindResourceResolver } from './resolvers/find-resource.resolver';
import { FindResourceByIdResolver } from './resolvers/find-resource-by-id.resolver';
import { UpdateResourceResolver } from './resolvers/update-resource.resolver';
import { DeleteResourceByIdResolver } from './resolvers/delete-resource-by-id.resolver';
import { DeleteResourcesResolver } from './resolvers/delete-resources.resolver';

export const AdminResourceControllers = [
    CreateResourceController,
    CreateResourcesController,
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
    CreateResourcesResolver,
    PaginateResourcesResolver,
    GetResourcesResolver,
    FindResourceResolver,
    FindResourceByIdResolver,
    UpdateResourceResolver,
    DeleteResourceByIdResolver,
    DeleteResourcesResolver,
];