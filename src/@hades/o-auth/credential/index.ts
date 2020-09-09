// commands
import { CreateCredentialCommandHandler } from './application/create/create-credential.command-handler';

// queries

// events
import { CreatedCredentialEventHandler } from './application/events/created-credential.event-handler';

// services
import { CreateCredentialService } from './application/create/create-credential.service';

// models

// repository

// sagas

export const OAuthCredentialHandlers = [
    // commands
    CreateCredentialCommandHandler,

    // queries
   
    // events
    CreatedCredentialEventHandler,
];

export const OAuthCredentialServices = [
    CreateCredentialService
];