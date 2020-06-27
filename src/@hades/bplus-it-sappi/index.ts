import { BplusItSappiSystemHandlers, BplusItSappiSystemServices, BplusItSappiSystemModel, ISystemRepository, SequelizeSystemRepository, SystemSagas } from './system';
import { BplusItSappiExecutionHandlers, BplusItSappiExecutionServices, BplusItSappiExecutionModel, IExecutionRepository, SequelizeExecutionRepository, ExecutionSagas } from './execution';

export const BplusItSappiHandlers = [
    ...BplusItSappiSystemHandlers,
    ...BplusItSappiExecutionHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiSystemServices,
    ...BplusItSappiExecutionServices
];
export const BplusItSappiModels = [
    BplusItSappiSystemModel,
    BplusItSappiExecutionModel
];
export const BplusItSappiRepositories = [
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
    SystemSagas,
    ExecutionSagas
];
