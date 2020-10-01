// controllers
import { PaginateRefreshTokensController } from './controllers/paginate-refresh-tokens.controller';
import { GetRefreshTokensController } from './controllers/get-refresh-tokens.controller';
import { FindRefreshTokenByIdController } from './controllers/find-refresh-token-by-id.controller';
import { FindRefreshTokenController } from './controllers/find-refresh-token.controller';
import { DeleteRefreshTokenByIdController } from './controllers/delete-refresh-token-by-id.controller';
import { DeleteRefreshTokensController } from './controllers/delete-refresh-tokens.controller';

// resolvers
import { PaginateRefreshTokensResolver } from './resolvers/paginate-refresh-tokens.resolver';
import { GetRefreshTokensResolver } from './resolvers/get-refresh-tokens.resolver';
import { FindRefreshTokenResolver } from './resolvers/find-refresh-token.resolver';
import { FindRefreshTokenByIdResolver } from './resolvers/find-refresh-token-by-id.resolver';
import { DeleteRefreshTokenByIdResolver } from './resolvers/delete-refresh-token-by-id.resolver';
import { DeleteRefreshTokensResolver } from './resolvers/delete-refresh-tokens.resolver';

export const OAuthRefreshTokenControllers = [
    PaginateRefreshTokensController,
    GetRefreshTokensController,
    FindRefreshTokenByIdController,
    FindRefreshTokenController,
    DeleteRefreshTokenByIdController,
    DeleteRefreshTokensController,
];

export const OAuthRefreshTokenResolvers = [
    PaginateRefreshTokensResolver,
    GetRefreshTokensResolver,
    FindRefreshTokenResolver,
    FindRefreshTokenByIdResolver,
    DeleteRefreshTokenByIdResolver,
    DeleteRefreshTokensResolver,
];