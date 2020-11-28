import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminCountryHandlers, AdminCountryServices, AdminCountryModel, ICountryRepository, SequelizeCountryRepository, CountrySagas } from './country';
import { AdminResourceHandlers, AdminResourceServices, AdminResourceModel, IResourceRepository, SequelizeResourceRepository, ResourceSagas } from './resource';
import { AdminAttachmentFamilyHandlers, AdminAttachmentFamilyServices, AdminAttachmentFamilyModel, IAttachmentFamilyRepository, SequelizeAttachmentFamilyRepository, AttachmentFamilySagas, AdminAttachmentFamiliesResourcesModel } from './attachment-family';
import { AdminAttachmentHandlers, AdminAttachmentServices, AdminAttachmentModel, IAttachmentRepository, SequelizeAttachmentRepository, AttachmentSagas } from './attachment';
import { AdminAdministrativeAreaLevel1Handlers, AdminAdministrativeAreaLevel1Services, AdminAdministrativeAreaLevel1Model, IAdministrativeAreaLevel1Repository, SequelizeAdministrativeAreaLevel1Repository, AdministrativeAreaLevel1Sagas } from './administrative-area-level-1';
import { AdminAdministrativeAreaLevel2Handlers, AdminAdministrativeAreaLevel2Services, AdminAdministrativeAreaLevel2Model, IAdministrativeAreaLevel2Repository, SequelizeAdministrativeAreaLevel2Repository, AdministrativeAreaLevel2Sagas } from './administrative-area-level-2';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminCountryHandlers,
    ...AdminResourceHandlers,
    ...AdminAttachmentFamilyHandlers,
    ...AdminAttachmentHandlers,
    ...AdminAdministrativeAreaLevel1Handlers,
    ...AdminAdministrativeAreaLevel2Handlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminCountryServices,
    ...AdminResourceServices,
    ...AdminAttachmentFamilyServices,
    ...AdminAttachmentServices,
    ...AdminAdministrativeAreaLevel1Services,
    ...AdminAdministrativeAreaLevel2Services
];
export const AdminModels = [
    AdminLangModel,
    AdminCountryModel,
    AdminResourceModel,
    AdminAttachmentFamilyModel,
    AdminAttachmentFamiliesResourcesModel,
    AdminAttachmentModel,
    AdminAdministrativeAreaLevel1Model,
    AdminAdministrativeAreaLevel2Model
];
export const AdminRepositories = [
    {
        provide: ILangRepository,
        useClass: SequelizeLangRepository
    },
    {
        provide: ICountryRepository,
        useClass: SequelizeCountryRepository
    },
    {
        provide: IResourceRepository,
        useClass: SequelizeResourceRepository
    },
    {
        provide: IAttachmentFamilyRepository,
        useClass: SequelizeAttachmentFamilyRepository
    },
    {
        provide: IAttachmentRepository,
        useClass: SequelizeAttachmentRepository
    },
    {
        provide: IAdministrativeAreaLevel1Repository,
        useClass: SequelizeAdministrativeAreaLevel1Repository
    },
    {
        provide: IAdministrativeAreaLevel2Repository,
        useClass: SequelizeAdministrativeAreaLevel2Repository
    }
];
export const AdminSagas = [
    LangSagas,
    CountrySagas,
    ResourceSagas,
    AttachmentFamilySagas,
    AttachmentSagas,
    AdministrativeAreaLevel1Sagas,
    AdministrativeAreaLevel2Sagas
];
