import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminCountryHandlers, AdminCountryServices, AdminCountryModel, ICountryRepository, SequelizeCountryRepository, CountrySagas } from './country';
import { AdminResourceHandlers, AdminResourceServices, AdminResourceModel, IResourceRepository, SequelizeResourceRepository, ResourceSagas } from './resource';
import { AdminAttachmentFamilyHandlers, AdminAttachmentFamilyServices, AdminAttachmentFamilyModel, IAttachmentFamilyRepository, SequelizeAttachmentFamilyRepository, AttachmentFamilySagas, AdminAttachmentFamiliesResourcesModel } from './attachment-family';
import { AdminAttachmentHandlers, AdminAttachmentServices, AdminAttachmentModel, IAttachmentRepository, SequelizeAttachmentRepository, AttachmentSagas } from './attachment';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminCountryHandlers,
    ...AdminResourceHandlers,
    ...AdminAttachmentFamilyHandlers,
    ...AdminAttachmentHandlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminCountryServices,
    ...AdminResourceServices,
    ...AdminAttachmentFamilyServices,
    ...AdminAttachmentServices
];
export const AdminModels = [
    AdminLangModel,
    AdminCountryModel,
    AdminResourceModel,
    AdminAttachmentFamilyModel,
    AdminAttachmentFamiliesResourcesModel,
    AdminAttachmentModel
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
    }
];
export const AdminSagas = [
    LangSagas,
    CountrySagas,
    ResourceSagas,
    AttachmentFamilySagas,
    AttachmentSagas
];
