import { BplusItSappiDataLakeHandlers, BplusItSappiDataLakeServices, BplusItSappiDataLakeModel, IDataLakeRepository, SequelizeDataLakeRepository, DataLakeSagas } from './data-lake';
import { BplusItSappiSystemHandlers, BplusItSappiSystemServices, BplusItSappiSystemModel, ISystemRepository, SequelizeSystemRepository, SystemSagas } from './system';
import { BplusItSappiExecutionHandlers, BplusItSappiExecutionServices, BplusItSappiExecutionModel, IExecutionRepository, SequelizeExecutionRepository, ExecutionSagas } from './execution';
import { BplusItSappiFlowHandlers, BplusItSappiFlowServices, BplusItSappiFlowModel, IFlowRepository, SequelizeFlowRepository, FlowSagas } from './flow';
import { BplusItSappiChannelHandlers, BplusItSappiChannelServices, BplusItSappiChannelModel, IChannelRepository, SequelizeChannelRepository, ChannelSagas } from './channel';

export const BplusItSappiHandlers = [
    ...BplusItSappiDataLakeHandlers,
    ...BplusItSappiSystemHandlers,
    ...BplusItSappiExecutionHandlers,
    ...BplusItSappiFlowHandlers,
    ...BplusItSappiChannelHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiDataLakeServices,
    ...BplusItSappiSystemServices,
    ...BplusItSappiExecutionServices,
    ...BplusItSappiFlowServices,
    ...BplusItSappiChannelServices
];
export const BplusItSappiModels = [
    BplusItSappiDataLakeModel,
    BplusItSappiSystemModel,
    BplusItSappiExecutionModel,
    BplusItSappiFlowModel,
    BplusItSappiChannelModel
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
    },
    {
        provide: IFlowRepository,
        useClass: SequelizeFlowRepository
    },
    {
        provide: IChannelRepository,
        useClass: SequelizeChannelRepository
    }
];
export const BplusItSappiSagas = [
    DataLakeSagas,
    SystemSagas,
    ExecutionSagas,
    FlowSagas,
    ChannelSagas
];
