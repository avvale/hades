// commands
import { CreateCredentialCommandHandler } from './application/create/create-credential.command-handler';

// queries
import { FindCredentialByIdQueryHandler } from './application/find/find-credential-by-id.query-handler';

// events
import { CreatedCredentialEventHandler } from './application/events/created-credential.event-handler';

// services
import { CreateCredentialService } from './application/create/create-credential.service';
import { FindCredentialByIdService } from './application/find/find-credential-by-id.service';

// sagas
export { CredentialSagas } from './application/sagas/credential.sagas';

export const OAuthCredentialHandlers = [
    // commands
    CreateCredentialCommandHandler,

    // queries
    FindCredentialByIdQueryHandler,

    // events
    CreatedCredentialEventHandler
];

export const OAuthCredentialServices = [
    CreateCredentialService,
    FindCredentialByIdService
];