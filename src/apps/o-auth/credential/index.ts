// controllers
import { OAuthCreateCredentialController } from './controllers/o-auth-create-credential.controller';

// resolvers
import { OAuthCreateCredentialResolver } from './resolvers/o-auth-create-credential.resolver';

// services
import { ClientCredentialsGrantService } from './services/client-credentials-grant.service';
import { PasswordGrantService } from './services/password-grant.service';

export const OAuthCredentialControllers = [
    OAuthCreateCredentialController
];

export const OAuthCredentialResolvers = [
    OAuthCreateCredentialResolver
];

export const OAuthCredentialServices = [
    ClientCredentialsGrantService,
    PasswordGrantService,
];