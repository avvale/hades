import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { AdminModels, AdminHandlers, AdminServices, AdminRepositories, AdminSagas } from '@hades/admin';
import { AdminLangControllers, AdminLangResolvers } from './lang';
import { AdminCountryControllers, AdminCountryResolvers } from './country';
import { AdminResourceControllers, AdminResourceResolvers } from './resource';
import { AdminAttachmentFamilyControllers, AdminAttachmentFamilyResolvers } from './attachment-family';
import { AdminAttachmentControllers, AdminAttachmentResolvers } from './attachment';
import { AdminAdministrativeAreaLevel1Controllers, AdminAdministrativeAreaLevel1Resolvers } from './administrative-area-level-1';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...AdminModels
            ])
    ],
    controllers: [
        ...AdminLangControllers,
        ...AdminCountryControllers,
        ...AdminResourceControllers,
        ...AdminAttachmentFamilyControllers,
        ...AdminAttachmentControllers,
        ...AdminAdministrativeAreaLevel1Controllers
    ],
    providers: [
        ...AdminHandlers,
        ...AdminServices,
        ...AdminRepositories,
        ...AdminSagas,
        ...AdminLangResolvers,
        ...AdminCountryResolvers,
        ...AdminResourceResolvers,
        ...AdminAttachmentFamilyResolvers,
        ...AdminAttachmentResolvers,
        ...AdminAdministrativeAreaLevel1Resolvers
    ]
})
export class AdminModule {}
