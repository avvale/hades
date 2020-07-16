import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { BplusItSappiModels, BplusItSappiHandlers, BplusItSappiServices, BplusItSappiRepositories, BplusItSappiSagas } from '@hades/bplus-it-sappi';
import { BplusItSappiDataLakeControllers, BplusItSappiDataLakeResolvers } from './data-lake';
import { BplusItSappiSystemControllers, BplusItSappiSystemResolvers } from './system';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...BplusItSappiModels
            ])
    ],
    controllers: [
        ...BplusItSappiDataLakeControllers,
        ...BplusItSappiSystemControllers
    ],
    providers: [
        ...BplusItSappiHandlers,
        ...BplusItSappiServices,
        ...BplusItSappiRepositories,
        ...BplusItSappiSagas,
        ...BplusItSappiDataLakeResolvers,
        ...BplusItSappiSystemResolvers
    ]
})
export class BplusItSappiModule {}
