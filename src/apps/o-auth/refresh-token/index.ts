// controllers
import { OAuthPaginateRefreshTokensController } from './controllers/o-auth-paginate-refresh-tokens.controller';
import { OAuthGetRefreshTokensController } from './controllers/o-auth-get-refresh-tokens.controller';
import { OAuthFindRefreshTokenByIdController } from './controllers/o-auth-find-refresh-token-by-id.controller';
import { OAuthFindRefreshTokenController } from './controllers/o-auth-find-refresh-token.controller';
import { OAuthDeleteRefreshTokenByIdController } from './controllers/o-auth-delete-refresh-token-by-id.controller';
import { OAuthDeleteRefreshTokensController } from './controllers/o-auth-delete-refresh-tokens.controller';

// resolvers
import { OAuthPaginateRefreshTokensResolver } from './resolvers/o-auth-paginate-refresh-tokens.resolver';
import { OAuthGetRefreshTokensResolver } from './resolvers/o-auth-get-refresh-tokens.resolver';
import { OAuthFindRefreshTokenResolver } from './resolvers/o-auth-find-refresh-token.resolver';
import { OAuthFindRefreshTokenByIdResolver } from './resolvers/o-auth-find-refresh-token-by-id.resolver';
import { OAuthDeleteRefreshTokenByIdResolver } from './resolvers/o-auth-delete-refresh-token-by-id.resolver';
import { OAuthDeleteRefreshTokensResolver } from './resolvers/o-auth-delete-refresh-tokens.resolver';

export const OAuthRefreshTokenControllers = [
    OAuthPaginateRefreshTokensController,
    OAuthGetRefreshTokensController,
    OAuthFindRefreshTokenByIdController,
    OAuthFindRefreshTokenController,
    OAuthDeleteRefreshTokenByIdController,
    OAuthDeleteRefreshTokensController,
];

export const OAuthRefreshTokenResolvers = [
    OAuthPaginateRefreshTokensResolver,
    OAuthGetRefreshTokensResolver,
    OAuthFindRefreshTokenResolver,
    OAuthFindRefreshTokenByIdResolver,
    OAuthDeleteRefreshTokenByIdResolver,
    OAuthDeleteRefreshTokensResolver,
];