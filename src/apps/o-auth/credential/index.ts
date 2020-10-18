// controllers
import { CreateCredentialController } from './controllers/create-credential.controller';

// resolvers
import { CreateCredentialResolver } from './resolvers/create-credential.resolver';

// services
import { PasswordGrantService } from './lib/password-grant.service';

export const OAuthCredentialControllers = [
    CreateCredentialController
];

export const OAuthCredentialResolvers = [
    CreateCredentialResolver
];

export const OAuthCredentialServices = [
    PasswordGrantService
];