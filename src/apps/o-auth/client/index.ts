// controllers
import { CreateClientController } from './controllers/create-client.controller';
import { CreateClientsController } from './controllers/create-clients.controller';
import { PaginateClientsController } from './controllers/paginate-clients.controller';
import { GetClientsController } from './controllers/get-clients.controller';
import { FindClientByIdController } from './controllers/find-client-by-id.controller';
import { FindClientController } from './controllers/find-client.controller';
import { UpdateClientController } from './controllers/update-client.controller';
import { DeleteClientByIdController } from './controllers/delete-client-by-id.controller';
import { DeleteClientsController } from './controllers/delete-clients.controller';

// resolvers
import { CreateClientResolver } from './resolvers/create-client.resolver';
import { CreateClientsResolver } from './resolvers/create-clients.resolver';
import { PaginateClientsResolver } from './resolvers/paginate-clients.resolver';
import { GetClientsResolver } from './resolvers/get-clients.resolver';
import { FindClientResolver } from './resolvers/find-client.resolver';
import { FindClientByIdResolver } from './resolvers/find-client-by-id.resolver';
import { UpdateClientResolver } from './resolvers/update-client.resolver';
import { DeleteClientByIdResolver } from './resolvers/delete-client-by-id.resolver';
import { DeleteClientsResolver } from './resolvers/delete-clients.resolver';

export const OAuthClientControllers = [
    CreateClientController,
    CreateClientsController,
    PaginateClientsController,
    GetClientsController,
    FindClientByIdController,
    FindClientController,
    UpdateClientController,
    DeleteClientByIdController,
    DeleteClientsController,
];

export const OAuthClientResolvers = [
    CreateClientResolver,
    CreateClientsResolver,
    PaginateClientsResolver,
    GetClientsResolver,
    FindClientResolver,
    FindClientByIdResolver,
    UpdateClientResolver,
    DeleteClientByIdResolver,
    DeleteClientsResolver,
];