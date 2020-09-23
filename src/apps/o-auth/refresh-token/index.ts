// controllers
import { CreateRefreshTokenController } from './controllers/create-refresh-token.controller';
import { CreateRefreshTokensController } from './controllers/create-refresh-tokens.controller';
import { PaginateRefreshTokensController } from './controllers/paginate-refresh-tokens.controller';
import { GetRefreshTokensController } from './controllers/get-refresh-tokens.controller';
import { FindRefreshTokenByIdController } from './controllers/find-refresh-token-by-id.controller';
import { FindRefreshTokenController } from './controllers/find-refresh-token.controller';
import { UpdateRefreshTokenController } from './controllers/update-refresh-token.controller';
import { DeleteRefreshTokenByIdController } from './controllers/delete-refresh-token-by-id.controller';
import { DeleteRefreshTokensController } from './controllers/delete-refresh-tokens.controller';

// resolvers
import { CreateRefreshTokenResolver } from './resolvers/create-refresh-token.resolver';
import { CreateRefreshTokensResolver } from './resolvers/create-refresh-tokens.resolver';
import { PaginateRefreshTokensResolver } from './resolvers/paginate-refresh-tokens.resolver';
import { GetRefreshTokensResolver } from './resolvers/get-refresh-tokens.resolver';
import { FindRefreshTokenResolver } from './resolvers/find-refresh-token.resolver';
import { FindRefreshTokenByIdResolver } from './resolvers/find-refresh-token-by-id.resolver';
import { UpdateRefreshTokenResolver } from './resolvers/update-refresh-token.resolver';
import { DeleteRefreshTokenByIdResolver } from './resolvers/delete-refresh-token-by-id.resolver';
import { DeleteRefreshTokensResolver } from './resolvers/delete-refresh-tokens.resolver';

export const OAuthRefreshTokenControllers = [
    CreateRefreshTokenController,
    CreateRefreshTokensController,
    PaginateRefreshTokensController,
    GetRefreshTokensController,
    FindRefreshTokenByIdController,
    FindRefreshTokenController,
    UpdateRefreshTokenController,
    DeleteRefreshTokenByIdController,
    DeleteRefreshTokensController,
];

export const OAuthRefreshTokenResolvers = [
    CreateRefreshTokenResolver,
    CreateRefreshTokensResolver,
    PaginateRefreshTokensResolver,
    GetRefreshTokensResolver,
    FindRefreshTokenResolver,
    FindRefreshTokenByIdResolver,
    UpdateRefreshTokenResolver,
    DeleteRefreshTokenByIdResolver,
    DeleteRefreshTokensResolver,
];