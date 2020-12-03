import { OrigenPartnerHandlers, OrigenPartnerServices, OrigenPartnerModel, IPartnerRepository, SequelizePartnerRepository, PartnerSagas } from './partner';

export const OrigenHandlers = [
    ...OrigenPartnerHandlers
];
export const OrigenServices = [
    ...OrigenPartnerServices
];
export const OrigenModels = [
    OrigenPartnerModel
];
export const OrigenRepositories = [
    {
        provide: IPartnerRepository,
        useClass: SequelizePartnerRepository
    }
];
export const OrigenSagas = [
    PartnerSagas
];
