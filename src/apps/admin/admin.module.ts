import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { AdminModels, AdminHandlers, AdminServices, AdminRepositories, AdminSagas } from '@hades/admin';
import { AdminLangControllers, AdminLangResolvers } from './lang';
import { AdminCountryControllers, AdminCountryResolvers } from './country';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...AdminModels
            ])
    ],
    controllers: [
        ...AdminLangControllers,
        ...AdminCountryControllers
    ],
    providers: [
        ...AdminHandlers,
        ...AdminServices,
        ...AdminRepositories,
        ...AdminSagas,
        ...AdminLangResolvers,
        ...AdminCountryResolvers
    ]
})
export class AdminModule {}
