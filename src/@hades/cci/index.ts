import { CciChannelDetailHandlers, CciChannelDetailServices, CciChannelDetailModel, IChannelDetailRepository, SequelizeChannelDetailRepository, ChannelDetailSagas } from './channel-detail';
import { CciChannelOverviewHandlers, CciChannelOverviewServices, CciChannelOverviewModel, IChannelOverviewRepository, SequelizeChannelOverviewRepository, ChannelOverviewSagas } from './channel-overview';
import { CciChannelHandlers, CciChannelServices, CciChannelModel, IChannelRepository, SequelizeChannelRepository, ChannelSagas } from './channel';
import { CciContactHandlers, CciContactServices, CciContactModel, IContactRepository, SequelizeContactRepository, ContactSagas } from './contact';
import { CciDataLakeHandlers, CciDataLakeServices, CciDataLakeModel, IDataLakeRepository, SequelizeDataLakeRepository, DataLakeSagas } from './data-lake';
import { CciExecutionHandlers, CciExecutionServices, CciExecutionModel, IExecutionRepository, SequelizeExecutionRepository, ExecutionSagas } from './execution';
import { CciFlowHandlers, CciFlowServices, CciFlowModel, IFlowRepository, SequelizeFlowRepository, FlowSagas } from './flow';
import { CciJobDetailHandlers, CciJobDetailServices, CciJobDetailModel, IJobDetailRepository, SequelizeJobDetailRepository, JobDetailSagas } from './job-detail';
import { CciJobOverviewHandlers, CciJobOverviewServices, CciJobOverviewModel, IJobOverviewRepository, SequelizeJobOverviewRepository, JobOverviewSagas } from './job-overview';
import { CciMessageDetailHandlers, CciMessageDetailServices, CciMessageDetailModel, IMessageDetailRepository, SequelizeMessageDetailRepository, MessageDetailSagas } from './message-detail';
import { CciMessageOverviewHandlers, CciMessageOverviewServices, CciMessageOverviewModel, IMessageOverviewRepository, SequelizeMessageOverviewRepository, MessageOverviewSagas } from './message-overview';
import { CciModuleHandlers, CciModuleServices, CciModuleModel, IModuleRepository, SequelizeModuleRepository, ModuleSagas } from './module';
import { CciRoleHandlers, CciRoleServices, CciRoleModel, IRoleRepository, SequelizeRoleRepository, RoleSagas } from './role';
import { CciSystemHandlers, CciSystemServices, CciSystemModel, ISystemRepository, SequelizeSystemRepository, SystemSagas } from './system';

export const CciHandlers = [
    ...CciChannelDetailHandlers,
    ...CciChannelOverviewHandlers,
    ...CciChannelHandlers,
    ...CciContactHandlers,
    ...CciDataLakeHandlers,
    ...CciExecutionHandlers,
    ...CciFlowHandlers,
    ...CciJobDetailHandlers,
    ...CciJobOverviewHandlers,
    ...CciMessageDetailHandlers,
    ...CciMessageOverviewHandlers,
    ...CciModuleHandlers,
    ...CciRoleHandlers,
    ...CciSystemHandlers
];
export const CciServices = [
    ...CciChannelDetailServices,
    ...CciChannelOverviewServices,
    ...CciChannelServices,
    ...CciContactServices,
    ...CciDataLakeServices,
    ...CciExecutionServices,
    ...CciFlowServices,
    ...CciJobDetailServices,
    ...CciJobOverviewServices,
    ...CciMessageDetailServices,
    ...CciMessageOverviewServices,
    ...CciModuleServices,
    ...CciRoleServices,
    ...CciSystemServices
];
export const CciModels = [
    CciChannelDetailModel,
    CciChannelOverviewModel,
    CciChannelModel,
    CciContactModel,
    CciDataLakeModel,
    CciExecutionModel,
    CciFlowModel,
    CciJobDetailModel,
    CciJobOverviewModel,
    CciMessageDetailModel,
    CciMessageOverviewModel,
    CciModuleModel,
    CciRoleModel,
    CciSystemModel
];
export const CciRepositories = [
    {
        provide: IChannelDetailRepository,
        useClass: SequelizeChannelDetailRepository
    },
    {
        provide: IChannelOverviewRepository,
        useClass: SequelizeChannelOverviewRepository
    },
    {
        provide: IChannelRepository,
        useClass: SequelizeChannelRepository
    },
    {
        provide: IContactRepository,
        useClass: SequelizeContactRepository
    },
    {
        provide: IDataLakeRepository,
        useClass: SequelizeDataLakeRepository
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
        provide: IJobDetailRepository,
        useClass: SequelizeJobDetailRepository
    },
    {
        provide: IJobOverviewRepository,
        useClass: SequelizeJobOverviewRepository
    },
    {
        provide: IMessageDetailRepository,
        useClass: SequelizeMessageDetailRepository
    },
    {
        provide: IMessageOverviewRepository,
        useClass: SequelizeMessageOverviewRepository
    },
    {
        provide: IModuleRepository,
        useClass: SequelizeModuleRepository
    },
    {
        provide: IRoleRepository,
        useClass: SequelizeRoleRepository
    },
    {
        provide: ISystemRepository,
        useClass: SequelizeSystemRepository
    }
];
export const CciSagas = [
    ChannelDetailSagas,
    ChannelOverviewSagas,
    ChannelSagas,
    ContactSagas,
    DataLakeSagas,
    ExecutionSagas,
    FlowSagas,
    JobDetailSagas,
    JobOverviewSagas,
    MessageDetailSagas,
    MessageOverviewSagas,
    ModuleSagas,
    RoleSagas,
    SystemSagas
];
