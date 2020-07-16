import { BplusItSappiDataLakeHandlers, BplusItSappiDataLakeServices, BplusItSappiDataLakeModel, IDataLakeRepository, SequelizeDataLakeRepository, DataLakeSagas } from './data-lake';
import { BplusItSappiSystemHandlers, BplusItSappiSystemServices, BplusItSappiSystemModel, ISystemRepository, SequelizeSystemRepository, SystemSagas } from './system';
import { BplusItSappiExecutionHandlers, BplusItSappiExecutionServices, BplusItSappiExecutionModel, IExecutionRepository, SequelizeExecutionRepository, ExecutionSagas } from './execution';

export const BplusItSappiHandlers = [
    ...BplusItSappiDataLakeHandlers,
    ...BplusItSappiSystemHandlers,
    ...BplusItSappiExecutionHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiDataLakeServices,
    ...BplusItSappiSystemServices,
    ...BplusItSappiExecutionServices
];
export const BplusItSappiModels = [
    BplusItSappiDataLakeModel,
    BplusItSappiSystemModel,
    BplusItSappiExecutionModel
];
export const BplusItSappiRepositories = [
    {
        provide: IDataLakeRepository,
        useClass: SequelizeDataLakeRepository
    },
    {
        provide: ISystemRepository,
        useClass: SequelizeSystemRepository
    },
    {
        provide: IExecutionRepository,
        useClass: SequelizeExecutionRepository
    }
];
export const BplusItSappiSagas = [
    DataLakeSagas,
    SystemSagas,
    ExecutionSagas
];
