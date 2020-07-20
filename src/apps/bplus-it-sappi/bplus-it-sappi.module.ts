import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { BplusItSappiModels, BplusItSappiHandlers, BplusItSappiServices, BplusItSappiRepositories, BplusItSappiSagas } from '@hades/bplus-it-sappi';
import { BplusItSappiDataLakeControllers, BplusItSappiDataLakeResolvers } from './data-lake';
import { BplusItSappiSystemControllers, BplusItSappiSystemResolvers } from './system';
import { BplusItSappiExecutionControllers, BplusItSappiExecutionResolvers } from './execution';
import { BplusItSappiFlowControllers, BplusItSappiFlowResolvers } from './flow';
import { BplusItSappiChannelControllers, BplusItSappiChannelResolvers } from './channel';
import { BplusItSappiRoleControllers, BplusItSappiRoleResolvers } from './role';
import { BplusItSappiJobOverviewControllers, BplusItSappiJobOverviewResolvers } from './job-overview';
import { BplusItSappiContactControllers, BplusItSappiContactResolvers } from './contact';
import { BplusItSappiJobDetailControllers, BplusItSappiJobDetailResolvers } from './job-detail';
import { BplusItSappiChannelOverviewControllers, BplusItSappiChannelOverviewResolvers } from './channel-overview';
import { BplusItSappiChannelDetailControllers, BplusItSappiChannelDetailResolvers } from './channel-detail';
import { BplusItSappiModuleControllers, BplusItSappiModuleResolvers } from './module';
import { BplusItSappiMessageOverviewControllers, BplusItSappiMessageOverviewResolvers } from './message-overview';
import { BplusItSappiMessageDetailControllers, BplusItSappiMessageDetailResolvers } from './message-detail';
import { BplusItSappiSnapshotControllers, BplusItSappiSnapshotResolvers } from './snapshot';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...BplusItSappiModels
            ])
    ],
    controllers: [
        ...BplusItSappiDataLakeControllers,
        ...BplusItSappiSystemControllers,
        ...BplusItSappiExecutionControllers,
        ...BplusItSappiFlowControllers,
        ...BplusItSappiChannelControllers,
        ...BplusItSappiRoleControllers,
        ...BplusItSappiJobOverviewControllers,
        ...BplusItSappiContactControllers,
        ...BplusItSappiJobDetailControllers,
        ...BplusItSappiChannelOverviewControllers,
        ...BplusItSappiChannelDetailControllers,
        ...BplusItSappiModuleControllers,
        ...BplusItSappiMessageOverviewControllers,
        ...BplusItSappiMessageDetailControllers,
        ...BplusItSappiSnapshotControllers
    ],
    providers: [
        ...BplusItSappiHandlers,
        ...BplusItSappiServices,
        ...BplusItSappiRepositories,
        ...BplusItSappiSagas,
        ...BplusItSappiDataLakeResolvers,
        ...BplusItSappiSystemResolvers,
        ...BplusItSappiExecutionResolvers,
        ...BplusItSappiFlowResolvers,
        ...BplusItSappiChannelResolvers,
        ...BplusItSappiRoleResolvers,
        ...BplusItSappiJobOverviewResolvers,
        ...BplusItSappiContactResolvers,
        ...BplusItSappiJobDetailResolvers,
        ...BplusItSappiChannelOverviewResolvers,
        ...BplusItSappiChannelDetailResolvers,
        ...BplusItSappiModuleResolvers,
        ...BplusItSappiMessageOverviewResolvers,
        ...BplusItSappiMessageDetailResolvers,
        ...BplusItSappiSnapshotResolvers
    ]
})
export class BplusItSappiModule {}
