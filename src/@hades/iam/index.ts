import { IamBoundedContextHandlers, IamBoundedContextServices, IamBoundedContextModel, IBoundedContextRepository, SequelizeBoundedContextRepository, BoundedContextSagas } from './bounded-context';
import { IamPermissionHandlers, IamPermissionServices, IamPermissionModel, IPermissionRepository, SequelizePermissionRepository, PermissionSagas, IamPermissionsRolesModel } from './permission';

export const IamHandlers = [
    ...IamBoundedContextHandlers,
    ...IamPermissionHandlers
];
export const IamServices = [
    ...IamBoundedContextServices,
    ...IamPermissionServices
];
export const IamModels = [
    IamBoundedContextModel,
    IamPermissionModel,
    IamPermissionsRolesModel
];
export const IamRepositories = [
    {
        provide: IBoundedContextRepository,
        useClass: SequelizeBoundedContextRepository
    },
    {
        provide: IPermissionRepository,
        useClass: SequelizePermissionRepository
    }
];
export const IamSagas = [
    BoundedContextSagas,
    PermissionSagas
];
