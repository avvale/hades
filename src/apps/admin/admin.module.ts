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
import { AdminAdministrativeAreaLevel2Controllers, AdminAdministrativeAreaLevel2Resolvers } from './administrative-area-level-2';
import { AdminAdministrativeAreaLevel3Controllers, AdminAdministrativeAreaLevel3Resolvers } from './administrative-area-level-3';
import { AdminAttachmentLibraryControllers, AdminAttachmentLibraryResolvers } from './attachment-library';
import { AdminUploadFileResolvers } from './upload-file';

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
        ...AdminAdministrativeAreaLevel1Controllers,
        ...AdminAdministrativeAreaLevel2Controllers,
        ...AdminAdministrativeAreaLevel3Controllers,
        ...AdminAttachmentLibraryControllers
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
        ...AdminAdministrativeAreaLevel1Resolvers,
        ...AdminAdministrativeAreaLevel2Resolvers,
        ...AdminAdministrativeAreaLevel3Resolvers,
        ...AdminAttachmentLibraryResolvers,
        ...AdminUploadFileResolvers
    ]
})
export class AdminModule {}
