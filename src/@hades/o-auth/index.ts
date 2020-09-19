import { OAuthApplicationHandlers, OAuthApplicationServices, OAuthApplicationModel, IApplicationRepository, SequelizeApplicationRepository, ApplicationSagas, OAuthApplicationsClientsModel } from './application';
import { OAuthCredentialHandlers, OAuthCredentialServices } from './credential';
import { OAuthClientHandlers, OAuthClientServices, OAuthClientModel, IClientRepository, SequelizeClientRepository, ClientSagas } from './client';
import { OAuthAccessTokenHandlers, OAuthAccessTokenServices, OAuthAccessTokenModel, IAccessTokenRepository, SequelizeAccessTokenRepository, AccessTokenSagas, client } from './access-token';
import { OAuthRefreshTokenHandlers, OAuthRefreshTokenServices, OAuthRefreshTokenModel, IRefreshTokenRepository, SequelizeRefreshTokenRepository, RefreshTokenSagas, accessToken } from './refresh-token';

export const OAuthHandlers = [
    ...OAuthApplicationHandlers,
    ...OAuthCredentialHandlers,
    ...OAuthClientHandlers,
    ...OAuthAccessTokenHandlers,
    ...OAuthRefreshTokenHandlers
];
export const OAuthServices = [
    ...OAuthApplicationServices,
    ...OAuthCredentialServices,
    ...OAuthClientServices,
    ...OAuthAccessTokenServices,
    ...OAuthRefreshTokenServices
];
export const OAuthModels = [
    OAuthApplicationModel,
    OAuthApplicationsClientsModel,
    OAuthClientModel,
    OAuthAccessTokenModel,
    OAuthRefreshTokenModel,
    client,
    accessToken
];
export const OAuthRepositories = [
    {
        provide: IApplicationRepository,
        useClass: SequelizeApplicationRepository
    },
    {
        provide: IClientRepository,
        useClass: SequelizeClientRepository
    },
    {
        provide: IAccessTokenRepository,
        useClass: SequelizeAccessTokenRepository
    },
    {
        provide: IRefreshTokenRepository,
        useClass: SequelizeRefreshTokenRepository
    }
];
export const OAuthSagas = [
    ApplicationSagas,
    ClientSagas,
    AccessTokenSagas,
    RefreshTokenSagas
];
