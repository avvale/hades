// controllers
import { PaginateAccessTokensController } from './controllers/paginate-access-tokens.controller';
import { GetAccessTokensController } from './controllers/get-access-tokens.controller';
import { FindAccessTokenByIdController } from './controllers/find-access-token-by-id.controller';
import { FindAccessTokenController } from './controllers/find-access-token.controller';
import { DeleteAccessTokenByIdController } from './controllers/delete-access-token-by-id.controller';
import { DeleteAccessTokensController } from './controllers/delete-access-tokens.controller';

// resolvers
import { PaginateAccessTokensResolver } from './resolvers/paginate-access-tokens.resolver';
import { GetAccessTokensResolver } from './resolvers/get-access-tokens.resolver';
import { FindAccessTokenResolver } from './resolvers/find-access-token.resolver';
import { FindAccessTokenByIdResolver } from './resolvers/find-access-token-by-id.resolver';
import { DeleteAccessTokenByIdResolver } from './resolvers/delete-access-token-by-id.resolver';
import { DeleteAccessTokensResolver } from './resolvers/delete-access-tokens.resolver';

export const OAuthAccessTokenControllers = [
    PaginateAccessTokensController,
    GetAccessTokensController,
    FindAccessTokenByIdController,
    FindAccessTokenController,
    DeleteAccessTokenByIdController,
    DeleteAccessTokensController,
];

export const OAuthAccessTokenResolvers = [
    PaginateAccessTokensResolver,
    GetAccessTokensResolver,
    FindAccessTokenResolver,
    FindAccessTokenByIdResolver,
    DeleteAccessTokenByIdResolver,
    DeleteAccessTokensResolver,
];