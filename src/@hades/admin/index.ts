import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminModuleHandlers, AdminModuleServices, AdminModuleModel, IModuleRepository, SequelizeModuleRepository, ModuleSagas } from './module';
import { AdminTenantHandlers, AdminTenantServices, AdminTenantModel, ITenantRepository, SequelizeTenantRepository, TenantSagas } from './tenant';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminModuleHandlers,
    ...AdminTenantHandlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminModuleServices,
    ...AdminTenantServices
];
export const AdminModels = [
    AdminLangModel,
    AdminModuleModel,
    AdminTenantModel
];
export const AdminRepositories = [
    {
        provide: ILangRepository,
        useClass: SequelizeLangRepository
    },
    {
        provide: IModuleRepository,
        useClass: SequelizeModuleRepository
    },
    {
        provide: ITenantRepository,
        useClass: SequelizeTenantRepository
    }
];
export const AdminSagas = [
    LangSagas,
    ModuleSagas,
    TenantSagas
];
