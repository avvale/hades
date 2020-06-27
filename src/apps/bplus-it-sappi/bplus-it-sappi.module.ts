import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { BplusItSappiModels, BplusItSappiHandlers, BplusItSappiServices, BplusItSappiRepositories, BplusItSappiSagas } from '@hades/bplus-it-sappi';
import { BplusItSappiSystemControllers, BplusItSappiSystemResolvers } from './system';
import { BplusItSappiExecutionControllers, BplusItSappiExecutionResolvers } from './execution';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...BplusItSappiModels])
    ],
    controllers: [
        ...BplusItSappiSystemControllers,
        ...BplusItSappiExecutionControllers
    ],
    providers: [
        ...BplusItSappiHandlers,
        ...BplusItSappiServices,
        ...BplusItSappiRepositories,
        ...BplusItSappiSagas,
        ...BplusItSappiSystemResolvers,
        ...BplusItSappiExecutionResolvers
    ]
})
export class BplusItSappiModule {}
