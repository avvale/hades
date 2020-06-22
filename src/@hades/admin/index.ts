// commands
import { CreateLangCommandHandler } from './lang/application/create/create-lang.command-handler';
import { InsertLangsCommandHandler } from './lang/application/insert/insert-langs.command-handler';
import { UpdateLangCommandHandler } from './lang/application/update/update-lang.command-handler';
import { DeleteLangByIdCommandHandler } from './lang/application/delete/delete-lang-by-id.command-handler';
import { DeleteLangsCommandHandler } from './lang/application/delete/delete-langs.command-handler';

// queries
import { PaginateLangsQueryHandler } from './lang/application/paginate/paginate-langs.query-handler';
import { GetLangsQueryHandler } from './lang/application/get/get-langs.query-handler';
import { FindLangQueryHandler } from './lang/application/find/find-lang.query-handler';
import { FindLangByIdQueryHandler } from './lang/application/find/find-lang-by-id.query-handler';

// events
import { CreatedLangEventHandler } from './lang/application/events/created-lang.event-handler';
import { UpdatedLangEventHandler } from './lang/application/events/updated-lang.event-handler';
import { DeletedLangEventHandler } from './lang/application/events/deleted-lang.event-handler';

// services
import { CreateLangService } from './lang/application/create/create-lang.service';
import { InsertLangsService } from './lang/application/insert/insert-langs.service';
import { PaginateLangsService } from './lang/application/paginate/paginate-langs.service';
import { GetLangsService } from './lang/application/get/get-langs.service';
import { FindLangService } from './lang/application/find/find-lang.service';
import { FindLangByIdService } from './lang/application/find/find-lang-by-id.service';
import { UpdateLangService } from './lang/application/update/update-lang.service';
import { DeleteLangByIdService } from './lang/application/delete/delete-lang-by-id.service';
import { DeleteLangsService } from './lang/application/delete/delete-langs.service';

// models
import { AdminLangModel } from './lang/infrastructure/sequelize/sequelize-lang.model';

// repository
import { ILangRepository } from './lang/domain/lang.repository';
import { SequelizeLangRepository } from './lang/infrastructure/sequelize/sequelize-lang.repository';

// sagas
import { LangSagas } from './lang/application/sagas/lang.sagas';
import { CreateTenantCommandHandler } from './tenant/application/create/create-tenant.command-handler';
import { InsertTenantsCommandHandler } from './tenant/application/insert/insert-tenants.command-handler';
import { UpdateTenantCommandHandler } from './tenant/application/update/update-tenant.command-handler';
import { DeleteTenantByIdCommandHandler } from './tenant/application/delete/delete-tenant-by-id.command-handler';
import { DeleteTenantsCommandHandler } from './tenant/application/delete/delete-tenants.command-handler';
import { PaginateTenantsQueryHandler } from './tenant/application/paginate/paginate-tenants.query-handler';
import { GetTenantsQueryHandler } from './tenant/application/get/get-tenants.query-handler';
import { FindTenantQueryHandler } from './tenant/application/find/find-tenant.query-handler';
import { FindTenantByIdQueryHandler } from './tenant/application/find/find-tenant-by-id.query-handler';
import { CreatedTenantEventHandler } from './tenant/application/events/created-tenant.event-handler';
import { UpdatedTenantEventHandler } from './tenant/application/events/updated-tenant.event-handler';
import { DeletedTenantEventHandler } from './tenant/application/events/deleted-tenant.event-handler';
import { CreateTenantService } from './tenant/application/create/create-tenant.service';
import { InsertTenantsService } from './tenant/application/insert/insert-tenants.service';
import { PaginateTenantsService } from './tenant/application/paginate/paginate-tenants.service';
import { GetTenantsService } from './tenant/application/get/get-tenants.service';
import { FindTenantService } from './tenant/application/find/find-tenant.service';
import { FindTenantByIdService } from './tenant/application/find/find-tenant-by-id.service';
import { UpdateTenantService } from './tenant/application/update/update-tenant.service';
import { DeleteTenantByIdService } from './tenant/application/delete/delete-tenant-by-id.service';
import { DeleteTenantsService } from './tenant/application/delete/delete-tenants.service';
import { ITenantRepository } from './tenant/domain/tenant.repository';
import { SequelizeTenantRepository } from './tenant/infrastructure/sequelize/sequelize-tenant.repository';
import { AdminTenantModel } from './tenant/infrastructure/sequelize/sequelize-tenant.model';
import { TenantSagas } from './tenant/application/sagas/tenant.sagas';

export const AdminHandlers = [
    // commands
    CreateLangCommandHandler,
    InsertLangsCommandHandler,
    UpdateLangCommandHandler,
    DeleteLangByIdCommandHandler,
    DeleteLangsCommandHandler,

    // queries
    PaginateLangsQueryHandler,
    GetLangsQueryHandler,
    FindLangQueryHandler,
    FindLangByIdQueryHandler,

    // events
    CreatedLangEventHandler,
    UpdatedLangEventHandler,
    DeletedLangEventHandler,
    CreateTenantCommandHandler,
    InsertTenantsCommandHandler,
    UpdateTenantCommandHandler,
    DeleteTenantByIdCommandHandler,
    DeleteTenantsCommandHandler,
    PaginateTenantsQueryHandler,
    GetTenantsQueryHandler,
    FindTenantQueryHandler,
    FindTenantByIdQueryHandler,
    CreatedTenantEventHandler,
    UpdatedTenantEventHandler,
    DeletedTenantEventHandler
];
export const AdminServices = [
    CreateLangService,
    InsertLangsService,
    PaginateLangsService,
    GetLangsService,
    FindLangService,
    FindLangByIdService,
    UpdateLangService,
    DeleteLangByIdService,
    DeleteLangsService,
    CreateTenantService,
    InsertTenantsService,
    PaginateTenantsService,
    GetTenantsService,
    FindTenantService,
    FindTenantByIdService,
    UpdateTenantService,
    DeleteTenantByIdService,
    DeleteTenantsService
];
export const AdminModels = [
    AdminLangModel,
    AdminTenantModel
];
export const AdminRepositories = [
    {
        provide: ILangRepository,
        useClass: SequelizeLangRepository,
    },
    {
        provide: ITenantRepository,
        useClass: SequelizeTenantRepository
    }
];
export const AdminSagas = [
    LangSagas,
    TenantSagas
];
