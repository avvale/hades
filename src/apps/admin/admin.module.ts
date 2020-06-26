import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { AdminModels, AdminHandlers, AdminServices, AdminRepositories, AdminSagas } from '@hades/admin';
import { AdminLangControllers, AdminLangResolvers } from './lang';
import { AdminModuleControllers, AdminModuleResolvers } from './module';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...AdminModels])
    ],
    controllers: [
        ...AdminLangControllers,
        ...AdminModuleControllers
    ],
    providers: [
        ...AdminHandlers,
        ...AdminServices,
        ...AdminRepositories,
        ...AdminSagas,
        ...AdminLangResolvers,
        ...AdminModuleResolvers
    ]
})
export class AdminModule {}
