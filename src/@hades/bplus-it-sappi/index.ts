import { BplusItSappiDataLakeHandlers, BplusItSappiDataLakeServices, BplusItSappiDataLakeModel, IDataLakeRepository, SequelizeDataLakeRepository, DataLakeSagas } from './data-lake';
import { BplusItSappiSystemHandlers, BplusItSappiSystemServices, BplusItSappiSystemModel, ISystemRepository, SequelizeSystemRepository, SystemSagas } from './system';

export const BplusItSappiHandlers = [
    ...BplusItSappiDataLakeHandlers,
    ...BplusItSappiSystemHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiDataLakeServices,
    ...BplusItSappiSystemServices
];
export const BplusItSappiModels = [
    BplusItSappiDataLakeModel,
    BplusItSappiSystemModel
];
export const BplusItSappiRepositories = [
    {
        provide: IDataLakeRepository,
        useClass: SequelizeDataLakeRepository
    },
    {
        provide: ISystemRepository,
        useClass: SequelizeSystemRepository
    }
];
export const BplusItSappiSagas = [
    DataLakeSagas,
    SystemSagas
];
