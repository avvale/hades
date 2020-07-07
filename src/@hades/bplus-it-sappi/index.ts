import { BplusItSappiSystemHandlers, BplusItSappiSystemServices, BplusItSappiSystemModel, ISystemRepository, SequelizeSystemRepository, SystemSagas } from './system';
import { BplusItSappiExecutionHandlers, BplusItSappiExecutionServices, BplusItSappiExecutionModel, IExecutionRepository, SequelizeExecutionRepository, ExecutionSagas } from './execution';
import { BplusItSappiDataLakeHandlers, BplusItSappiDataLakeServices, BplusItSappiDataLakeModel, IDataLakeRepository, SequelizeDataLakeRepository, DataLakeSagas } from './data-lake';
import { BplusItSappiJobOverviewHandlers, BplusItSappiJobOverviewServices, BplusItSappiJobOverviewModel, IJobOverviewRepository, SequelizeJobOverviewRepository, JobOverviewSagas } from './job-overview';
import { BplusItSappiChannelOverviewHandlers, BplusItSappiChannelOverviewServices, BplusItSappiChannelOverviewModel, IChannelOverviewRepository, SequelizeChannelOverviewRepository, ChannelOverviewSagas } from './channel-overview';
import { BplusItSappiMessageOverviewHandlers, BplusItSappiMessageOverviewServices, BplusItSappiMessageOverviewModel, IMessageOverviewRepository, SequelizeMessageOverviewRepository, MessageOverviewSagas } from './message-overview';
import { BplusItSappiRoleHandlers, BplusItSappiRoleServices, BplusItSappiRoleModel, IRoleRepository, SequelizeRoleRepository, RoleSagas } from './role';
import { BplusItSappiJobDetailHandlers, BplusItSappiJobDetailServices, BplusItSappiJobDetailModel, IJobDetailRepository, SequelizeJobDetailRepository, JobDetailSagas } from './job-detail';
import { BplusItSappiChannelHandlers, BplusItSappiChannelServices, BplusItSappiChannelModel, IChannelRepository, SequelizeChannelRepository, ChannelSagas } from './channel';
import { BplusItSappiModuleHandlers, BplusItSappiModuleServices, BplusItSappiModuleModel, IModuleRepository, SequelizeModuleRepository, ModuleSagas } from './module';

export const BplusItSappiHandlers = [
    ...BplusItSappiSystemHandlers,
    ...BplusItSappiExecutionHandlers,
    ...BplusItSappiDataLakeHandlers,
    ...BplusItSappiJobOverviewHandlers,
    ...BplusItSappiChannelOverviewHandlers,
    ...BplusItSappiMessageOverviewHandlers,
    ...BplusItSappiRoleHandlers,
    ...BplusItSappiJobDetailHandlers,
    ...BplusItSappiChannelHandlers,
    ...BplusItSappiModuleHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiSystemServices,
    ...BplusItSappiExecutionServices,
    ...BplusItSappiDataLakeServices,
    ...BplusItSappiJobOverviewServices,
    ...BplusItSappiChannelOverviewServices,
    ...BplusItSappiMessageOverviewServices,
    ...BplusItSappiRoleServices,
    ...BplusItSappiJobDetailServices,
    ...BplusItSappiChannelServices,
    ...BplusItSappiModuleServices
];
export const BplusItSappiModels = [
    BplusItSappiSystemModel,
    BplusItSappiExecutionModel,
    BplusItSappiDataLakeModel,
    BplusItSappiJobOverviewModel,
    BplusItSappiChannelOverviewModel,
    BplusItSappiMessageOverviewModel,
    BplusItSappiRoleModel,
    BplusItSappiJobDetailModel,
    BplusItSappiChannelModel,
    BplusItSappiModuleModel,
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
    },
    {
        provide: IJobOverviewRepository,
        useClass: SequelizeJobOverviewRepository
    },
    {
        provide: IChannelOverviewRepository,
        useClass: SequelizeChannelOverviewRepository
    },
    {
        provide: IMessageOverviewRepository,
        useClass: SequelizeMessageOverviewRepository
    },
    {
        provide: IRoleRepository,
        useClass: SequelizeRoleRepository
    },
    {
        provide: IJobDetailRepository,
        useClass: SequelizeJobDetailRepository
    },
    {
        provide: IChannelRepository,
        useClass: SequelizeChannelRepository
    },
    {
        provide: IModuleRepository,
        useClass: SequelizeModuleRepository
    }
];
export const BplusItSappiSagas = [
    SystemSagas,
    ExecutionSagas,
    DataLakeSagas,
    JobOverviewSagas,
    ChannelOverviewSagas,
    MessageOverviewSagas,
    RoleSagas,
    JobDetailSagas,
    ChannelSagas,
    ModuleSagas,
];
