import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminCountryHandlers, AdminCountryServices, AdminCountryModel, ICountryRepository, SequelizeCountryRepository, CountrySagas } from './country';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminCountryHandlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminCountryServices
];
export const AdminModels = [
    AdminLangModel,
    AdminCountryModel
];
export const AdminRepositories = [
    {
        provide: ILangRepository,
        useClass: SequelizeLangRepository
    },
    {
        provide: ICountryRepository,
        useClass: SequelizeCountryRepository
    }
];
export const AdminSagas = [
    LangSagas,
    CountrySagas
];
