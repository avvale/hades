import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { AdminModels, AdminHandlers, AdminServices, AdminRepositories, AdminSagas } from '@hades/admin';
import { AdminLangControllers, AdminLangResolvers } from './lang';
import { AdminTenantControllers, AdminTenantResolvers } from './tenant';
import { AdminBoundedContextControllers, AdminBoundedContextResolvers } from './bounded-context';
import { AdminPermissionControllers, AdminPermissionResolvers } from './permission';
import { AdminResourceControllers, AdminResourceResolvers } from './resource';
import { AdminRoleControllers, AdminRoleResolvers } from './role';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...AdminModels])
    ],
    controllers: [
        ...AdminLangControllers,
        ...AdminTenantControllers,
        ...AdminBoundedContextControllers,
        ...AdminPermissionControllers,
        ...AdminResourceControllers,
        ...AdminRoleControllers
    ],
    providers: [
        ...AdminHandlers,
        ...AdminServices,
        ...AdminRepositories,
        ...AdminSagas,
        ...AdminLangResolvers,
        ...AdminTenantResolvers,
        ...AdminBoundedContextResolvers,
        ...AdminPermissionResolvers,
        ...AdminResourceResolvers,
        ...AdminRoleResolvers
    ]
})
export class AdminModule {}
