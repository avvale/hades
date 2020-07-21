// controllers
import { CreateSessionController } from './controllers/create-session.controller';
import { CreateSessionsController } from './controllers/create-sessions.controller';
import { PaginateSessionsController } from './controllers/paginate-sessions.controller';
import { GetSessionsController } from './controllers/get-sessions.controller';
import { FindSessionByIdController } from './controllers/find-session-by-id.controller';
import { FindSessionController } from './controllers/find-session.controller';
import { UpdateSessionController } from './controllers/update-session.controller';
import { DeleteSessionByIdController } from './controllers/delete-session-by-id.controller';
import { DeleteSessionsController } from './controllers/delete-sessions.controller';

// resolvers
import { CreateSessionResolver } from './resolvers/create-session.resolver';
import { CreateSessionsResolver } from './resolvers/create-sessions.resolver';
import { PaginateSessionsResolver } from './resolvers/paginate-sessions.resolver';
import { GetSessionsResolver } from './resolvers/get-sessions.resolver';
import { FindSessionResolver } from './resolvers/find-session.resolver';
import { FindSessionByIdResolver } from './resolvers/find-session-by-id.resolver';
import { UpdateSessionResolver } from './resolvers/update-session.resolver';
import { DeleteSessionByIdResolver } from './resolvers/delete-session-by-id.resolver';
import { DeleteSessionsResolver } from './resolvers/delete-sessions.resolver';

export const NfcSessionControllers = [
    CreateSessionController,
    CreateSessionsController,
    PaginateSessionsController,
    GetSessionsController,
    FindSessionByIdController,
    FindSessionController,
    UpdateSessionController,
    DeleteSessionByIdController,
    DeleteSessionsController,
];

export const NfcSessionResolvers = [
    CreateSessionResolver,
    CreateSessionsResolver,
    PaginateSessionsResolver,
    GetSessionsResolver,
    FindSessionResolver,
    FindSessionByIdResolver,
    UpdateSessionResolver,
    DeleteSessionByIdResolver,
    DeleteSessionsResolver,
];