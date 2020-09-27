import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';

export const AdminHandlers = [
    ...AdminLangHandlers
];
export const AdminServices = [
    ...AdminLangServices
];
export const AdminModels = [
    AdminLangModel
];
export const AdminRepositories = [
    {
        provide: ILangRepository,
        useClass: SequelizeLangRepository
    }
];
export const AdminSagas = [
    LangSagas
];
