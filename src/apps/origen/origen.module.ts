import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { OrigenModels, OrigenHandlers, OrigenServices, OrigenRepositories, OrigenSagas } from '@hades/origen';
import { OrigenPartnerControllers, OrigenPartnerResolvers } from './partner';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...OrigenModels
            ])
    ],
    controllers: [
        ...OrigenPartnerControllers
    ],
    providers: [
        ...OrigenHandlers,
        ...OrigenServices,
        ...OrigenRepositories,
        ...OrigenSagas,
        ...OrigenPartnerResolvers
    ]
})
export class OrigenModule {}
