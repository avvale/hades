// commands
import { CreateSessionCommandHandler } from './application/create/create-session.command-handler';
import { CreateSessionsCommandHandler } from './application/create/create-sessions.command-handler';
import { UpdateSessionCommandHandler } from './application/update/update-session.command-handler';
import { DeleteSessionByIdCommandHandler } from './application/delete/delete-session-by-id.command-handler';
import { DeleteSessionsCommandHandler } from './application/delete/delete-sessions.command-handler';

// queries
import { PaginateSessionsQueryHandler } from './application/paginate/paginate-sessions.query-handler';
import { GetSessionsQueryHandler } from './application/get/get-sessions.query-handler';
import { FindSessionQueryHandler } from './application/find/find-session.query-handler';
import { FindSessionByIdQueryHandler } from './application/find/find-session-by-id.query-handler';

// events
import { CreatedSessionEventHandler } from './application/events/created-session.event-handler';
import { CreatedSessionsEventHandler } from './application/events/created-sessions.event-handler';
import { UpdatedSessionEventHandler } from './application/events/updated-session.event-handler';
import { DeletedSessionEventHandler } from './application/events/deleted-session.event-handler';
import { DeletedSessionsEventHandler } from './application/events/deleted-sessions.event-handler';

// services
import { CreateSessionService } from './application/create/create-session.service';
import { CreateSessionsService } from './application/create/create-sessions.service';
import { PaginateSessionsService } from './application/paginate/paginate-sessions.service';
import { GetSessionsService } from './application/get/get-sessions.service';
import { FindSessionService } from './application/find/find-session.service';
import { FindSessionByIdService } from './application/find/find-session-by-id.service';
import { UpdateSessionService } from './application/update/update-session.service';
import { DeleteSessionByIdService } from './application/delete/delete-session-by-id.service';
import { DeleteSessionsService } from './application/delete/delete-sessions.service';

// models
export { NfcSessionModel } from './infrastructure/sequelize/sequelize-session.model';


// repository
export { ISessionRepository } from './domain/session.repository';
export { SequelizeSessionRepository } from './infrastructure/sequelize/sequelize-session.repository';

// sagas
export { SessionSagas } from './application/sagas/session.sagas';

export const NfcSessionHandlers = [
    // commands
    CreateSessionCommandHandler,
    CreateSessionsCommandHandler,
    UpdateSessionCommandHandler,
    DeleteSessionByIdCommandHandler,
    DeleteSessionsCommandHandler,

    // queries
    PaginateSessionsQueryHandler,
    GetSessionsQueryHandler,
    FindSessionQueryHandler,
    FindSessionByIdQueryHandler,

    // events
    CreatedSessionEventHandler,
    CreatedSessionsEventHandler,
    UpdatedSessionEventHandler,
    DeletedSessionEventHandler,
    DeletedSessionsEventHandler,
];

export const NfcSessionServices = [
    CreateSessionService,
    CreateSessionsService,
    PaginateSessionsService,
    GetSessionsService,
    FindSessionService,
    FindSessionByIdService,
    UpdateSessionService,
    DeleteSessionByIdService,
    DeleteSessionsService,
];