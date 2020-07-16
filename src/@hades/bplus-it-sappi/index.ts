import { BplusItSappiDataLakeHandlers, BplusItSappiDataLakeServices, BplusItSappiDataLakeModel, IDataLakeRepository, SequelizeDataLakeRepository, DataLakeSagas } from './data-lake';
import { BplusItSappiSystemHandlers, BplusItSappiSystemServices, BplusItSappiSystemModel, ISystemRepository, SequelizeSystemRepository, SystemSagas } from './system';
import { BplusItSappiExecutionHandlers, BplusItSappiExecutionServices, BplusItSappiExecutionModel, IExecutionRepository, SequelizeExecutionRepository, ExecutionSagas } from './execution';
import { BplusItSappiFlowHandlers, BplusItSappiFlowServices, BplusItSappiFlowModel, IFlowRepository, SequelizeFlowRepository, FlowSagas } from './flow';
import { BplusItSappiChannelHandlers, BplusItSappiChannelServices, BplusItSappiChannelModel, IChannelRepository, SequelizeChannelRepository, ChannelSagas } from './channel';
import { BplusItSappiRoleHandlers, BplusItSappiRoleServices, BplusItSappiRoleModel, IRoleRepository, SequelizeRoleRepository, RoleSagas } from './role';
import { BplusItSappiJobOverviewHandlers, BplusItSappiJobOverviewServices, BplusItSappiJobOverviewModel, IJobOverviewRepository, SequelizeJobOverviewRepository, JobOverviewSagas } from './job-overview';
import { BplusItSappiContactHandlers, BplusItSappiContactServices, BplusItSappiContactModel, IContactRepository, SequelizeContactRepository, ContactSagas } from './contact';
import { BplusItSappiJobDetailHandlers, BplusItSappiJobDetailServices, BplusItSappiJobDetailModel, IJobDetailRepository, SequelizeJobDetailRepository, JobDetailSagas } from './job-detail';
import { BplusItSappiChannelOverviewHandlers, BplusItSappiChannelOverviewServices, BplusItSappiChannelOverviewModel, IChannelOverviewRepository, SequelizeChannelOverviewRepository, ChannelOverviewSagas } from './channel-overview';
import { BplusItSappiChannelDetailHandlers, BplusItSappiChannelDetailServices, BplusItSappiChannelDetailModel, IChannelDetailRepository, SequelizeChannelDetailRepository, ChannelDetailSagas } from './channel-detail';
import { BplusItSappiModuleHandlers, BplusItSappiModuleServices, BplusItSappiModuleModel, IModuleRepository, SequelizeModuleRepository, ModuleSagas } from './module';
import { BplusItSappiMessageOverviewHandlers, BplusItSappiMessageOverviewServices, BplusItSappiMessageOverviewModel, IMessageOverviewRepository, SequelizeMessageOverviewRepository, MessageOverviewSagas } from './message-overview';
import { BplusItSappiMessageDetailHandlers, BplusItSappiMessageDetailServices, BplusItSappiMessageDetailModel, IMessageDetailRepository, SequelizeMessageDetailRepository, MessageDetailSagas } from './message-detail';

export const BplusItSappiHandlers = [
    ...BplusItSappiDataLakeHandlers,
    ...BplusItSappiSystemHandlers,
    ...BplusItSappiExecutionHandlers,
    ...BplusItSappiFlowHandlers,
    ...BplusItSappiChannelHandlers,
    ...BplusItSappiRoleHandlers,
    ...BplusItSappiJobOverviewHandlers,
    ...BplusItSappiContactHandlers,
    ...BplusItSappiJobDetailHandlers,
    ...BplusItSappiChannelOverviewHandlers,
    ...BplusItSappiChannelDetailHandlers,
    ...BplusItSappiModuleHandlers,
    ...BplusItSappiMessageOverviewHandlers,
    ...BplusItSappiMessageDetailHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiDataLakeServices,
    ...BplusItSappiSystemServices,
    ...BplusItSappiExecutionServices,
    ...BplusItSappiFlowServices,
    ...BplusItSappiChannelServices,
    ...BplusItSappiRoleServices,
    ...BplusItSappiJobOverviewServices,
    ...BplusItSappiContactServices,
    ...BplusItSappiJobDetailServices,
    ...BplusItSappiChannelOverviewServices,
    ...BplusItSappiChannelDetailServices,
    ...BplusItSappiModuleServices,
    ...BplusItSappiMessageOverviewServices,
    ...BplusItSappiMessageDetailServices
];
export const BplusItSappiModels = [
    BplusItSappiDataLakeModel,
    BplusItSappiSystemModel,
    BplusItSappiExecutionModel,
    BplusItSappiFlowModel,
    BplusItSappiChannelModel,
    BplusItSappiRoleModel,
    BplusItSappiJobOverviewModel,
    BplusItSappiContactModel,
    BplusItSappiJobDetailModel,
    BplusItSappiChannelOverviewModel,
    BplusItSappiChannelDetailModel,
    BplusItSappiModuleModel,
    BplusItSappiMessageOverviewModel,
    BplusItSappiMessageDetailModel
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
    },
    {
        provide: IRoleRepository,
        useClass: SequelizeRoleRepository
    },
    {
        provide: IJobOverviewRepository,
        useClass: SequelizeJobOverviewRepository
    },
    {
        provide: IContactRepository,
        useClass: SequelizeContactRepository
    },
    {
        provide: IJobDetailRepository,
        useClass: SequelizeJobDetailRepository
    },
    {
        provide: IChannelOverviewRepository,
        useClass: SequelizeChannelOverviewRepository
    },
    {
        provide: IChannelDetailRepository,
        useClass: SequelizeChannelDetailRepository
    },
    {
        provide: IModuleRepository,
        useClass: SequelizeModuleRepository
    },
    {
        provide: IMessageOverviewRepository,
        useClass: SequelizeMessageOverviewRepository
    },
    {
        provide: IMessageDetailRepository,
        useClass: SequelizeMessageDetailRepository
    }
];
export const BplusItSappiSagas = [
    DataLakeSagas,
    SystemSagas,
    ExecutionSagas,
    FlowSagas,
    ChannelSagas,
    RoleSagas,
    JobOverviewSagas,
    ContactSagas,
    JobDetailSagas,
    ChannelOverviewSagas,
    ChannelDetailSagas,
    ModuleSagas,
    MessageOverviewSagas,
    MessageDetailSagas
];
