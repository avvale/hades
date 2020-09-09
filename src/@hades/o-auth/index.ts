import { OAuthApplicationHandlers, OAuthApplicationServices, OAuthApplicationModel, IApplicationRepository, SequelizeApplicationRepository, ApplicationSagas } from './application';
import { OAuthCredentialHandlers, OAuthCredentialServices } from './credential';

export const OAuthHandlers = [
    ...OAuthApplicationHandlers,
    ...OAuthCredentialHandlers
];
export const OAuthServices = [
    ...OAuthApplicationServices,
    ...OAuthCredentialServices
];
export const OAuthModels = [
    OAuthApplicationModel
];
export const OAuthRepositories = [
    {
        provide: IApplicationRepository,
        useClass: SequelizeApplicationRepository
    }
];
export const OAuthSagas = [
    ApplicationSagas
];
