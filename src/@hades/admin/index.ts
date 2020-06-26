import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminModuleHandlers, AdminModuleServices, AdminModuleModel, IModuleRepository, SequelizeModuleRepository, ModuleSagas } from './module';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminModuleHandlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminModuleServices
];
export const AdminModels = [
    AdminLangModel,
    AdminModuleModel
];
export const AdminRepositories = [
    {
        provide: ILangRepository,
        useClass: SequelizeLangRepository
    },
    {
        provide: IModuleRepository,
        useClass: SequelizeModuleRepository
    }
];
export const AdminSagas = [
    LangSagas,
    ModuleSagas
];
