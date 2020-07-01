import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminModuleHandlers, AdminModuleServices, AdminModuleModel, IModuleRepository, SequelizeModuleRepository, ModuleSagas } from './module';
import { AdminTenantHandlers, AdminTenantServices, AdminTenantModel, ITenantRepository, SequelizeTenantRepository, TenantSagas } from './tenant';
import { AdminPermissionHandlers, AdminPermissionServices, AdminPermissionModel, IPermissionRepository, SequelizePermissionRepository, PermissionSagas } from './permission';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminModuleHandlers,
    ...AdminTenantHandlers,
    ...AdminPermissionHandlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminModuleServices,
    ...AdminTenantServices,
    ...AdminPermissionServices
];
export const AdminModels = [
    AdminLangModel,
    AdminModuleModel,
    AdminTenantModel,
    AdminPermissionModel
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
    },
    {
        provide: IPermissionRepository,
        useClass: SequelizePermissionRepository
    }
];
export const AdminSagas = [
    LangSagas,
    ModuleSagas,
    TenantSagas,
    PermissionSagas
];
