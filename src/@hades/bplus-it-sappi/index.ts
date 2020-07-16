import { BplusItSappiDataLakeHandlers, BplusItSappiDataLakeServices, BplusItSappiDataLakeModel, IDataLakeRepository, SequelizeDataLakeRepository, DataLakeSagas } from './data-lake';

export const BplusItSappiHandlers = [
    ...BplusItSappiDataLakeHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiDataLakeServices
];
export const BplusItSappiModels = [
    BplusItSappiDataLakeModel
];
export const BplusItSappiRepositories = [
    {
        provide: IDataLakeRepository,
        useClass: SequelizeDataLakeRepository
    }
];
export const BplusItSappiSagas = [
    DataLakeSagas
];
