import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminTenantHandlers, AdminTenantServices, AdminTenantModel, ITenantRepository, SequelizeTenantRepository, TenantSagas } from './tenant';
import { AdminBoundedContextHandlers, AdminBoundedContextServices, AdminBoundedContextModel, IBoundedContextRepository, SequelizeBoundedContextRepository, BoundedContextSagas } from './bounded-context';
import { AdminPermissionHandlers, AdminPermissionServices, AdminPermissionModel, IPermissionRepository, SequelizePermissionRepository, PermissionSagas } from './permission';
import { AdminResourceHandlers, AdminResourceServices, AdminResourceModel, IResourceRepository, SequelizeResourceRepository, ResourceSagas } from './resource';
import { AdminRoleHandlers, AdminRoleServices, AdminRoleModel, IRoleRepository, SequelizeRoleRepository, RoleSagas } from './role';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminTenantHandlers,
    ...AdminBoundedContextHandlers,
    ...AdminPermissionHandlers,
    ...AdminResourceHandlers,
    ...AdminRoleHandlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminTenantServices,
    ...AdminBoundedContextServices,
    ...AdminPermissionServices,
    ...AdminResourceServices,
    ...AdminRoleServices
];
export const AdminModels = [
    AdminLangModel,
    AdminTenantModel,
    AdminBoundedContextModel,
    AdminPermissionModel,
    AdminResourceModel,
    AdminRoleModel
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
    },
    {
        provide: IRoleRepository,
        useClass: SequelizeRoleRepository
    }
];
export const AdminSagas = [
    LangSagas,
    TenantSagas,
    BoundedContextSagas,
    PermissionSagas,
    ResourceSagas,
    RoleSagas
];
