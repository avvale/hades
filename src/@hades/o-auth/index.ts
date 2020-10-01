import { OAuthAccessTokenHandlers, OAuthAccessTokenServices, OAuthAccessTokenModel, IAccessTokenRepository, SequelizeAccessTokenRepository, AccessTokenSagas } from './access-token';
import { OAuthApplicationHandlers, OAuthApplicationServices, OAuthApplicationModel, IApplicationRepository, SequelizeApplicationRepository, ApplicationSagas, OAuthApplicationsClientsModel } from './application';
import { OAuthClientHandlers, OAuthClientServices, OAuthClientModel, IClientRepository, SequelizeClientRepository, ClientSagas } from './client';
import { OAuthRefreshTokenHandlers, OAuthRefreshTokenServices, OAuthRefreshTokenModel, IRefreshTokenRepository, SequelizeRefreshTokenRepository, RefreshTokenSagas } from './refresh-token';
import { OAuthCredentialHandlers, OAuthCredentialServices, CredentialSagas } from './credential';

export const OAuthHandlers = [
    ...OAuthAccessTokenHandlers,
    ...OAuthApplicationHandlers,
    ...OAuthClientHandlers,
    ...OAuthRefreshTokenHandlers,
    ...OAuthCredentialHandlers
];
export const OAuthServices = [
    ...OAuthAccessTokenServices,
    ...OAuthApplicationServices,
    ...OAuthClientServices,
    ...OAuthRefreshTokenServices,
    ...OAuthCredentialServices
];
export const OAuthModels = [
    OAuthAccessTokenModel,
    OAuthApplicationModel,
    OAuthClientModel,
    OAuthRefreshTokenModel,
    OAuthApplicationsClientsModel
];
export const OAuthRepositories = [
    {
        provide: IAccessTokenRepository,
        useClass: SequelizeAccessTokenRepository
    },
    {
        provide: IApplicationRepository,
        useClass: SequelizeApplicationRepository
    },
    {
        provide: IClientRepository,
        useClass: SequelizeClientRepository
    },
    {
        provide: IRefreshTokenRepository,
        useClass: SequelizeRefreshTokenRepository
    }
];
export const OAuthSagas = [
    AccessTokenSagas,
    ApplicationSagas,
    ClientSagas,
    RefreshTokenSagas,
    CredentialSagas
];
