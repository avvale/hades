import { BplusItSappiSystemHandlers, BplusItSappiSystemServices, BplusItSappiSystemModel, ISystemRepository, SequelizeSystemRepository, SystemSagas } from './system';

export const BplusItSappiHandlers = [
    ...BplusItSappiSystemHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiSystemServices
];
export const BplusItSappiModels = [
    BplusItSappiSystemModel
];
export const BplusItSappiRepositories = [
    {
        provide: ISystemRepository,
        useClass: SequelizeSystemRepository
    }
];
export const BplusItSappiSagas = [
    SystemSagas
];
