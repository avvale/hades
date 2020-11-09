import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { IamModels, IamHandlers, IamServices, IamRepositories, IamSagas } from '@hades/iam';
import { IamBoundedContextControllers, IamBoundedContextResolvers } from './bounded-context';
import { IamPermissionControllers, IamPermissionResolvers } from './permission';
import { IamRoleControllers, IamRoleResolvers } from './role';
import { IamAccountControllers, IamAccountResolvers } from './account';
import { IamTenantControllers, IamTenantResolvers } from './tenant';
import { IamUserControllers, IamUserResolvers } from './user';

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
        ...IamRoleControllers,
        ...IamAccountControllers,
        ...IamTenantControllers,
        ...IamUserControllers
    ],
    providers: [
        ...IamHandlers,
        ...IamServices,
        ...IamRepositories,
        ...IamSagas,
        ...IamBoundedContextResolvers,
        ...IamPermissionResolvers,
        ...IamRoleResolvers,
        ...IamAccountResolvers,
        ...IamTenantResolvers,
        ...IamUserResolvers
    ]
})
export class IamModule {}
