import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminTenantHandlers, AdminTenantServices, AdminTenantModel, ITenantRepository, SequelizeTenantRepository, TenantSagas } from './tenant';
import { AdminBoundedContextHandlers, AdminBoundedContextServices, AdminBoundedContextModel, IBoundedContextRepository, SequelizeBoundedContextRepository, BoundedContextSagas } from './bounded-context';
import { AdminPermissionHandlers, AdminPermissionServices, AdminPermissionModel, IPermissionRepository, SequelizePermissionRepository, PermissionSagas } from './permission';
import { AdminResourceHandlers, AdminResourceServices, AdminResourceModel, IResourceRepository, SequelizeResourceRepository, ResourceSagas } from './resource';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminTenantHandlers,
    ...AdminBoundedContextHandlers,
    ...AdminPermissionHandlers,
    ...AdminResourceHandlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminTenantServices,
    ...AdminBoundedContextServices,
    ...AdminPermissionServices,
    ...AdminResourceServices
];
export const AdminModels = [
    AdminLangModel,
    AdminTenantModel,
    AdminBoundedContextModel,
    AdminPermissionModel,
    AdminResourceModel
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
    },
    {
        provide: IResourceRepository,
        useClass: SequelizeResourceRepository
    }
];
export const AdminSagas = [
    LangSagas,
    TenantSagas,
    BoundedContextSagas,
    PermissionSagas,
    ResourceSagas
];
