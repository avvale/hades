import { IamBoundedContextHandlers, IamBoundedContextServices, IamBoundedContextModel, IBoundedContextRepository, SequelizeBoundedContextRepository, BoundedContextSagas } from './bounded-context';
import { IamPermissionHandlers, IamPermissionServices, IamPermissionModel, IPermissionRepository, SequelizePermissionRepository, PermissionSagas, IamPermissionsRolesModel } from './permission';
import { IamRoleHandlers, IamRoleServices, IamRoleModel, IRoleRepository, SequelizeRoleRepository, RoleSagas, IamRolesAccountsModel } from './role';

export const IamHandlers = [
    ...IamBoundedContextHandlers,
    ...IamPermissionHandlers,
    ...IamRoleHandlers
];
export const IamServices = [
    ...IamBoundedContextServices,
    ...IamPermissionServices,
    ...IamRoleServices
];
export const IamModels = [
    IamBoundedContextModel,
    IamPermissionModel,
    IamPermissionsRolesModel,
    IamRoleModel,
    IamRolesAccountsModel
];
export const IamRepositories = [
    {
        provide: IBoundedContextRepository,
        useClass: SequelizeBoundedContextRepository
    },
    {
        provide: IPermissionRepository,
        useClass: SequelizePermissionRepository
    },
    {
        provide: IRoleRepository,
        useClass: SequelizeRoleRepository
    }
];
export const IamSagas = [
    BoundedContextSagas,
    PermissionSagas,
    RoleSagas
];
