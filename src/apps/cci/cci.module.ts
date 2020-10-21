import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { CciModels, CciHandlers, CciServices, CciRepositories, CciSagas } from '@hades/cci';
import { CciChannelDetailControllers, CciChannelDetailResolvers } from './channel-detail';
import { CciChannelOverviewControllers, CciChannelOverviewResolvers } from './channel-overview';
import { CciChannelControllers, CciChannelResolvers } from './channel';
import { CciContactControllers, CciContactResolvers } from './contact';
import { CciDataLakeControllers, CciDataLakeResolvers } from './data-lake';
import { CciExecutionControllers, CciExecutionResolvers } from './execution';
import { CciFlowControllers, CciFlowResolvers } from './flow';
import { CciJobDetailControllers, CciJobDetailResolvers } from './job-detail';
import { CciJobOverviewControllers, CciJobOverviewResolvers } from './job-overview';
import { CciMessageDetailControllers, CciMessageDetailResolvers } from './message-detail';
import { CciMessageOverviewControllers, CciMessageOverviewResolvers } from './message-overview';
import { CciModuleControllers, CciModuleResolvers } from './module';
import { CciRoleControllers, CciRoleResolvers } from './role';
import { CciSystemControllers, CciSystemResolvers } from './system';
import { CciDashboardResolvers } from './dashboard';
import { CciSummaryResolvers } from './summary';
import { CciSnapshotControllers } from './snapshot';
import { CciCatalogControllers } from './catalog';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...CciModels
        ])
    ],
    controllers: [
        ...CciChannelDetailControllers,
        ...CciChannelOverviewControllers,
        ...CciChannelControllers,
        ...CciContactControllers,
        ...CciDataLakeControllers,
        ...CciExecutionControllers,
        ...CciFlowControllers,
        ...CciJobDetailControllers,
        ...CciJobOverviewControllers,
        ...CciMessageDetailControllers,
        ...CciMessageOverviewControllers,
        ...CciModuleControllers,
        ...CciRoleControllers,
        ...CciSystemControllers,
        ...CciSnapshotControllers,
        ...CciCatalogControllers,
    ],
    providers: [
        ...CciHandlers,
        ...CciServices,
        ...CciRepositories,
        ...CciSagas,
        ...CciChannelDetailResolvers,
        ...CciChannelOverviewResolvers,
        ...CciChannelResolvers,
        ...CciContactResolvers,
        ...CciDataLakeResolvers,
        ...CciExecutionResolvers,
        ...CciFlowResolvers,
        ...CciJobDetailResolvers,
        ...CciJobOverviewResolvers,
        ...CciMessageDetailResolvers,
        ...CciMessageOverviewResolvers,
        ...CciModuleResolvers,
        ...CciRoleResolvers,
        ...CciSystemResolvers,
        ...CciDashboardResolvers,
        ...CciSummaryResolvers
    ]
})
export class CciModule {}
