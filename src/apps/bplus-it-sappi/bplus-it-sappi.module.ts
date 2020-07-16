import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { BplusItSappiModels, BplusItSappiHandlers, BplusItSappiServices, BplusItSappiRepositories, BplusItSappiSagas } from '@hades/bplus-it-sappi';
import { BplusItSappiDataLakeControllers, BplusItSappiDataLakeResolvers } from './data-lake';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...BplusItSappiModels
            ])
    ],
    controllers: [
        ...BplusItSappiDataLakeControllers
    ],
    providers: [
        ...BplusItSappiHandlers,
        ...BplusItSappiServices,
        ...BplusItSappiRepositories,
        ...BplusItSappiSagas,
        ...BplusItSappiDataLakeResolvers
    ]
})
export class BplusItSappiModule {}
