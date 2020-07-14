import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { BplusItSappiModels, BplusItSappiHandlers, BplusItSappiServices, BplusItSappiRepositories, BplusItSappiSagas } from '@hades/bplus-it-sappi';
import { BplusItSappiSystemControllers, BplusItSappiSystemResolvers } from './system';
import { BplusItSappiExecutionControllers, BplusItSappiExecutionResolvers } from './execution';
import { BplusItSappiDataLakeControllers, BplusItSappiDataLakeResolvers } from './data-lake';
import { BplusItSappiJobOverviewControllers, BplusItSappiJobOverviewResolvers } from './job-overview';
import { BplusItSappiChannelOverviewControllers, BplusItSappiChannelOverviewResolvers } from './channel-overview';
import { BplusItSappiMessageOverviewControllers, BplusItSappiMessageOverviewResolvers } from './message-overview';
import { BplusItSappiRoleControllers, BplusItSappiRoleResolvers } from './role';
import { BplusItSappiJobDetailControllers, BplusItSappiJobDetailResolvers } from './job-detail';
import { BplusItSappiFlowControllers, BplusItSappiFlowResolvers } from './flow';
import { BplusItSappiContactControllers, BplusItSappiContactResolvers } from './contact';
import { BplusItSappiChannelControllers, BplusItSappiChannelResolvers } from './channel';
import { BplusItSappiModuleControllers, BplusItSappiModuleResolvers } from './module';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...BplusItSappiModels])
    ],
    controllers: [
        ...BplusItSappiSystemControllers,
        ...BplusItSappiExecutionControllers,
        ...BplusItSappiDataLakeControllers,
        ...BplusItSappiJobOverviewControllers,
        ...BplusItSappiChannelOverviewControllers,
        ...BplusItSappiMessageOverviewControllers,
        ...BplusItSappiRoleControllers,
        ...BplusItSappiJobDetailControllers,
        ...BplusItSappiFlowControllers,
        ...BplusItSappiContactControllers,
        ...BplusItSappiChannelControllers,
        ...BplusItSappiModuleControllers
    ],
    providers: [
        ...BplusItSappiHandlers,
        ...BplusItSappiServices,
        ...BplusItSappiRepositories,
        ...BplusItSappiSagas,
        ...BplusItSappiSystemResolvers,
        ...BplusItSappiExecutionResolvers,
        ...BplusItSappiDataLakeResolvers,
        ...BplusItSappiJobOverviewResolvers,
        ...BplusItSappiChannelOverviewResolvers,
        ...BplusItSappiMessageOverviewResolvers,
        ...BplusItSappiRoleResolvers,
        ...BplusItSappiJobDetailResolvers,
        ...BplusItSappiFlowResolvers,
        ...BplusItSappiContactResolvers,
        ...BplusItSappiChannelResolvers,
        ...BplusItSappiModuleResolvers
    ]
})
export class BplusItSappiModule {}