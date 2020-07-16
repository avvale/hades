import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { BplusItSappiModels, BplusItSappiHandlers, BplusItSappiServices, BplusItSappiRepositories, BplusItSappiSagas } from '@hades/bplus-it-sappi';
import { BplusItSappiDataLakeControllers, BplusItSappiDataLakeResolvers } from './data-lake';
import { BplusItSappiSystemControllers, BplusItSappiSystemResolvers } from './system';
import { BplusItSappiExecutionControllers, BplusItSappiExecutionResolvers } from './execution';
import { BplusItSappiFlowControllers, BplusItSappiFlowResolvers } from './flow';
import { BplusItSappiChannelControllers, BplusItSappiChannelResolvers } from './channel';

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
        ...BplusItSappiChannelControllers
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
        ...BplusItSappiChannelResolvers
    ]
})
export class BplusItSappiModule {}
