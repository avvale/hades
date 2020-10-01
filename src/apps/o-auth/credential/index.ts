// controllers
import { CreateCredentialController } from './controllers/create-credential.controller';

// resolvers
import { CreateCredentialResolver } from './resolvers/create-credential.resolver';

export const OAuthCredentialControllers = [
    CreateCredentialController
];

export const OAuthCredentialResolvers = [
    CreateCredentialResolver
];