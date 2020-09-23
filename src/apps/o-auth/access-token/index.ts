// controllers
import { CreateAccessTokenController } from './controllers/create-access-token.controller';
import { CreateAccessTokensController } from './controllers/create-access-tokens.controller';
import { PaginateAccessTokensController } from './controllers/paginate-access-tokens.controller';
import { GetAccessTokensController } from './controllers/get-access-tokens.controller';
import { FindAccessTokenByIdController } from './controllers/find-access-token-by-id.controller';
import { FindAccessTokenController } from './controllers/find-access-token.controller';
import { UpdateAccessTokenController } from './controllers/update-access-token.controller';
import { DeleteAccessTokenByIdController } from './controllers/delete-access-token-by-id.controller';
import { DeleteAccessTokensController } from './controllers/delete-access-tokens.controller';

// resolvers
import { CreateAccessTokenResolver } from './resolvers/create-access-token.resolver';
import { CreateAccessTokensResolver } from './resolvers/create-access-tokens.resolver';
import { PaginateAccessTokensResolver } from './resolvers/paginate-access-tokens.resolver';
import { GetAccessTokensResolver } from './resolvers/get-access-tokens.resolver';
import { FindAccessTokenResolver } from './resolvers/find-access-token.resolver';
import { FindAccessTokenByIdResolver } from './resolvers/find-access-token-by-id.resolver';
import { UpdateAccessTokenResolver } from './resolvers/update-access-token.resolver';
import { DeleteAccessTokenByIdResolver } from './resolvers/delete-access-token-by-id.resolver';
import { DeleteAccessTokensResolver } from './resolvers/delete-access-tokens.resolver';

export const OAuthAccessTokenControllers = [
    CreateAccessTokenController,
    CreateAccessTokensController,
    PaginateAccessTokensController,
    GetAccessTokensController,
    FindAccessTokenByIdController,
    FindAccessTokenController,
    UpdateAccessTokenController,
    DeleteAccessTokenByIdController,
    DeleteAccessTokensController,
];

export const OAuthAccessTokenResolvers = [
    CreateAccessTokenResolver,
    CreateAccessTokensResolver,
    PaginateAccessTokensResolver,
    GetAccessTokensResolver,
    FindAccessTokenResolver,
    FindAccessTokenByIdResolver,
    UpdateAccessTokenResolver,
    DeleteAccessTokenByIdResolver,
    DeleteAccessTokensResolver,
];