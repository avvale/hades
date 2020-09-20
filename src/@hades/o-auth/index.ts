import { OAuthAccessTokenHandlers, OAuthAccessTokenServices, OAuthAccessTokenModel, IAccessTokenRepository, SequelizeAccessTokenRepository, AccessTokenSagas } from './access-token';
import { OAuthApplicationHandlers, OAuthApplicationServices, OAuthApplicationModel, IApplicationRepository, SequelizeApplicationRepository, ApplicationSagas } from './application';
import { OAuthClientHandlers, OAuthClientServices, OAuthClientModel, IClientRepository, SequelizeClientRepository, ClientSagas } from './client';
import { OAuthRefreshTokenHandlers, OAuthRefreshTokenServices, OAuthRefreshTokenModel, IRefreshTokenRepository, SequelizeRefreshTokenRepository, RefreshTokenSagas } from './refresh-token';

export const OAuthHandlers = [
    ...OAuthAccessTokenHandlers,
    ...OAuthApplicationHandlers,
    ...OAuthClientHandlers,
    ...OAuthRefreshTokenHandlers
];
export const OAuthServices = [
    ...OAuthAccessTokenServices,
    ...OAuthApplicationServices,
    ...OAuthClientServices,
    ...OAuthRefreshTokenServices
];
export const OAuthModels = [
    OAuthAccessTokenModel,
    OAuthApplicationModel,
    OAuthClientModel,
    OAuthRefreshTokenModel
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
    RefreshTokenSagas
];
