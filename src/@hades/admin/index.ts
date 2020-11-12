import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminCountryHandlers, AdminCountryServices, AdminCountryModel, ICountryRepository, SequelizeCountryRepository, CountrySagas } from './country';
import { AdminResourceHandlers, AdminResourceServices, AdminResourceModel, IResourceRepository, SequelizeResourceRepository, ResourceSagas } from './resource';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminCountryHandlers,
    ...AdminResourceHandlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminCountryServices,
    ...AdminResourceServices
];
export const AdminModels = [
    AdminLangModel,
    AdminCountryModel,
    AdminResourceModel
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
    }
];
export const AdminSagas = [
    LangSagas,
    CountrySagas,
    ResourceSagas
];
