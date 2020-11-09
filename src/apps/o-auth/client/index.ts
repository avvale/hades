// controllers
import { OAuthCreateClientController } from './controllers/o-auth-create-client.controller';
import { OAuthCreateClientsController } from './controllers/o-auth-create-clients.controller';
import { OAuthPaginateClientsController } from './controllers/o-auth-paginate-clients.controller';
import { OAuthGetClientsController } from './controllers/o-auth-get-clients.controller';
import { OAuthFindClientByIdController } from './controllers/o-auth-find-client-by-id.controller';
import { OAuthFindClientController } from './controllers/o-auth-find-client.controller';
import { OAuthUpdateClientController } from './controllers/o-auth-update-client.controller';
import { OAuthDeleteClientByIdController } from './controllers/o-auth-delete-client-by-id.controller';
import { OAuthDeleteClientsController } from './controllers/o-auth-delete-clients.controller';

// resolvers
import { OAuthCreateClientResolver } from './resolvers/o-auth-create-client.resolver';
import { OAuthCreateClientsResolver } from './resolvers/o-auth-create-clients.resolver';
import { OAuthPaginateClientsResolver } from './resolvers/o-auth-paginate-clients.resolver';
import { OAuthGetClientsResolver } from './resolvers/o-auth-get-clients.resolver';
import { OAuthFindClientResolver } from './resolvers/o-auth-find-client.resolver';
import { OAuthFindClientByIdResolver } from './resolvers/o-auth-find-client-by-id.resolver';
import { OAuthUpdateClientResolver } from './resolvers/o-auth-update-client.resolver';
import { OAuthDeleteClientByIdResolver } from './resolvers/o-auth-delete-client-by-id.resolver';
import { OAuthDeleteClientsResolver } from './resolvers/o-auth-delete-clients.resolver';

export const OAuthClientControllers = [
    OAuthCreateClientController,
    OAuthCreateClientsController,
    OAuthPaginateClientsController,
    OAuthGetClientsController,
    OAuthFindClientByIdController,
    OAuthFindClientController,
    OAuthUpdateClientController,
    OAuthDeleteClientByIdController,
    OAuthDeleteClientsController,
];

export const OAuthClientResolvers = [
    OAuthCreateClientResolver,
    OAuthCreateClientsResolver,
    OAuthPaginateClientsResolver,
    OAuthGetClientsResolver,
    OAuthFindClientResolver,
    OAuthFindClientByIdResolver,
    OAuthUpdateClientResolver,
    OAuthDeleteClientByIdResolver,
    OAuthDeleteClientsResolver,
];