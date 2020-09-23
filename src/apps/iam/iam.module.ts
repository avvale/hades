import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { IamModels, IamHandlers, IamServices, IamRepositories, IamSagas } from '@hades/iam';
import { IamBoundedContextControllers, IamBoundedContextResolvers } from './bounded-context';
import { IamPermissionControllers, IamPermissionResolvers } from './permission';
import { IamRoleControllers, IamRoleResolvers } from './role';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...IamModels
            ])
    ],
    controllers: [
        ...IamBoundedContextControllers,
        ...IamPermissionControllers,
        ...IamRoleControllers
    ],
    providers: [
        ...IamHandlers,
        ...IamServices,
        ...IamRepositories,
        ...IamSagas,
        ...IamBoundedContextResolvers,
        ...IamPermissionResolvers,
        ...IamRoleResolvers
    ]
})
export class IamModule {}
