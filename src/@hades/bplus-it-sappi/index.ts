import { BplusItSappiSystemHandlers, BplusItSappiSystemServices, BplusItSappiSystemModel, ISystemRepository, SequelizeSystemRepository, SystemSagas } from './system';
import { BplusItSappiExecutionHandlers, BplusItSappiExecutionServices, BplusItSappiExecutionModel, IExecutionRepository, SequelizeExecutionRepository, ExecutionSagas } from './execution';
import { BplusItSappiDataLakeHandlers, BplusItSappiDataLakeServices, BplusItSappiDataLakeModel, IDataLakeRepository, SequelizeDataLakeRepository, DataLakeSagas } from './data-lake';

export const BplusItSappiHandlers = [
    ...BplusItSappiSystemHandlers,
    ...BplusItSappiExecutionHandlers,
    ...BplusItSappiDataLakeHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiSystemServices,
    ...BplusItSappiExecutionServices,
    ...BplusItSappiDataLakeServices
];
export const BplusItSappiModels = [
    BplusItSappiSystemModel,
    BplusItSappiExecutionModel,
    BplusItSappiDataLakeModel
];
export const BplusItSappiRepositories = [
    {
        provide: ISystemRepository,
        useClass: SequelizeSystemRepository
    },
    {
        provide: IExecutionRepository,
        useClass: SequelizeExecutionRepository
    },
    {
        provide: IDataLakeRepository,
        useClass: SequelizeDataLakeRepository
    }
];
export const BplusItSappiSagas = [
    SystemSagas,
    ExecutionSagas,
    DataLakeSagas
];
