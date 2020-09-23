import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { IamModels, IamHandlers, IamServices, IamRepositories, IamSagas } from '@hades/iam';
import { IamBoundedContextControllers, IamBoundedContextResolvers } from './bounded-context';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...IamModels
            ])
    ],
    controllers: [
        ...IamBoundedContextControllers
    ],
    providers: [
        ...IamHandlers,
        ...IamServices,
        ...IamRepositories,
        ...IamSagas,
        ...IamBoundedContextResolvers
    ]
})
export class IamModule {}
