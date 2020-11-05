// controllers
import { OAuthPaginateAccessTokensController } from './controllers/o-auth-paginate-access-tokens.controller';
import { OAuthGetAccessTokensController } from './controllers/o-auth-get-access-tokens.controller';
import { OAuthFindAccessTokenByIdController } from './controllers/o-auth-find-access-token-by-id.controller';
import { OAuthFindAccessTokenController } from './controllers/o-auth-find-access-token.controller';
import { OAuthDeleteAccessTokenByIdController } from './controllers/o-auth-delete-access-token-by-id.controller';
import { OAuthDeleteAccessTokensController } from './controllers/o-auth-delete-access-tokens.controller';

// resolvers
import { OAuthPaginateAccessTokensResolver } from './resolvers/o-auth-paginate-access-tokens.resolver';
import { OAuthGetAccessTokensResolver } from './resolvers/o-auth-get-access-tokens.resolver';
import { OAuthFindAccessTokenResolver } from './resolvers/o-auth-find-access-token.resolver';
import { OAuthFindAccessTokenByIdResolver } from './resolvers/o-auth-find-access-token-by-id.resolver';
import { OAuthDeleteAccessTokenByIdResolver } from './resolvers/o-auth-delete-access-token-by-id.resolver';
import { OAuthDeleteAccessTokensResolver } from './resolvers/o-auth-delete-access-tokens.resolver';

export const OAuthAccessTokenControllers = [
    OAuthPaginateAccessTokensController,
    OAuthGetAccessTokensController,
    OAuthFindAccessTokenByIdController,
    OAuthFindAccessTokenController,
    OAuthDeleteAccessTokenByIdController,
    OAuthDeleteAccessTokensController,
];

export const OAuthAccessTokenResolvers = [
    OAuthPaginateAccessTokensResolver,
    OAuthGetAccessTokensResolver,
    OAuthFindAccessTokenResolver,
    OAuthFindAccessTokenByIdResolver,
    OAuthDeleteAccessTokenByIdResolver,
    OAuthDeleteAccessTokensResolver,
];