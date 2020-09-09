// controllers

// resolvers
import { CreateCredentialResolver } from './resolvers/create-credential.resolver';
import { FindMeResolver } from './resolvers/find-me.resolver';
import { FindMePermissionsResolver } from './resolvers/find-me-permissions.resolver';

export const OAuthCredentialControllers = [
];

export const OAuthCredentialResolvers = [
    CreateCredentialResolver,
    FindMeResolver,
    FindMePermissionsResolver
];