import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminTenantHandlers, AdminTenantServices, AdminTenantModel, ITenantRepository, SequelizeTenantRepository, TenantSagas } from './tenant';
import { AdminBoundedContextHandlers, AdminBoundedContextServices, AdminBoundedContextModel, IBoundedContextRepository, SequelizeBoundedContextRepository, BoundedContextSagas } from './bounded-context';
import { AdminPermissionHandlers, AdminPermissionServices, AdminPermissionModel, IPermissionRepository, SequelizePermissionRepository, PermissionSagas } from './permission';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminTenantHandlers,
    ...AdminBoundedContextHandlers,
    ...AdminPermissionHandlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminTenantServices,
    ...AdminBoundedContextServices,
    ...AdminPermissionServices
];
export const AdminModels = [
    AdminLangModel,
    AdminTenantModel,
    AdminBoundedContextModel,
    AdminPermissionModel
];
export const AdminRepositories = [
    {
        provide: ILangRepository,
        useClass: SequelizeLangRepository
    },
    {
        provide: ITenantRepository,
        useClass: SequelizeTenantRepository
    },
    {
        provide: IBoundedContextRepository,
        useClass: SequelizeBoundedContextRepository
    },
    {
        provide: IPermissionRepository,
        useClass: SequelizePermissionRepository
    }
];
export const AdminSagas = [
    LangSagas,
    TenantSagas,
    BoundedContextSagas,
    PermissionSagas
];
