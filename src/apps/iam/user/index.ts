// controllers
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUsersController } from './controllers/create-users.controller';
import { PaginateUsersController } from './controllers/paginate-users.controller';
import { GetUsersController } from './controllers/get-users.controller';
import { FindUserByIdController } from './controllers/find-user-by-id.controller';
import { FindUserController } from './controllers/find-user.controller';
import { UpdateUserController } from './controllers/update-user.controller';
import { DeleteUserByIdController } from './controllers/delete-user-by-id.controller';
import { DeleteUsersController } from './controllers/delete-users.controller';

// resolvers
import { CreateUserResolver } from './resolvers/create-user.resolver';
import { CreateUsersResolver } from './resolvers/create-users.resolver';
import { PaginateUsersResolver } from './resolvers/paginate-users.resolver';
import { GetUsersResolver } from './resolvers/get-users.resolver';
import { FindUserResolver } from './resolvers/find-user.resolver';
import { FindUserByIdResolver } from './resolvers/find-user-by-id.resolver';
import { UpdateUserResolver } from './resolvers/update-user.resolver';
import { DeleteUserByIdResolver } from './resolvers/delete-user-by-id.resolver';
import { DeleteUsersResolver } from './resolvers/delete-users.resolver';

export const IamUserControllers = [
    CreateUserController,
    CreateUsersController,
    PaginateUsersController,
    GetUsersController,
    FindUserByIdController,
    FindUserController,
    UpdateUserController,
    DeleteUserByIdController,
    DeleteUsersController,
];

export const IamUserResolvers = [
    CreateUserResolver,
    CreateUsersResolver,
    PaginateUsersResolver,
    GetUsersResolver,
    FindUserResolver,
    FindUserByIdResolver,
    UpdateUserResolver,
    DeleteUserByIdResolver,
    DeleteUsersResolver,
];