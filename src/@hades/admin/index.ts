import { AdminLangHandlers, AdminLangServices, AdminLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { AdminTenantHandlers, AdminTenantServices, AdminTenantModel, ITenantRepository, SequelizeTenantRepository, TenantSagas } from './tenant';
import { AdminBoundedContextHandlers, AdminBoundedContextServices, AdminBoundedContextModel, IBoundedContextRepository, SequelizeBoundedContextRepository, BoundedContextSagas } from './bounded-context';

export const AdminHandlers = [
    ...AdminLangHandlers,
    ...AdminTenantHandlers,
    ...AdminBoundedContextHandlers
];
export const AdminServices = [
    ...AdminLangServices,
    ...AdminTenantServices,
    ...AdminBoundedContextServices
];
export const AdminModels = [
    AdminLangModel,
    AdminTenantModel,
    AdminBoundedContextModel
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
    }
];
export const AdminSagas = [
    LangSagas,
    TenantSagas,
    BoundedContextSagas
];
