import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { AdminModels, AdminHandlers, AdminServices, AdminRepositories, AdminSagas } from '@hades/admin';
import { AdminLangControllers, AdminLangResolvers } from './lang';
import { AdminModuleControllers, AdminModuleResolvers } from './module';
import { AdminTenantControllers, AdminTenantResolvers } from './tenant';
import { AdminPermissionControllers, AdminPermissionResolvers } from './permission';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...AdminModels])
    ],
    controllers: [
        ...AdminLangControllers,
        ...AdminModuleControllers,
        ...AdminTenantControllers,
        ...AdminPermissionControllers
    ],
    providers: [
        ...AdminHandlers,
        ...AdminServices,
        ...AdminRepositories,
        ...AdminSagas,
        ...AdminLangResolvers,
        ...AdminModuleResolvers,
        ...AdminTenantResolvers,
        ...AdminPermissionResolvers
    ]
})
export class AdminModule {}
