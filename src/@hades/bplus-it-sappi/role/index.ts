// commands
import { CreateRoleCommandHandler } from './application/create/create-role.command-handler';
import { InsertRolesCommandHandler } from './application/insert/insert-roles.command-handler';
import { UpdateRoleCommandHandler } from './application/update/update-role.command-handler';
import { DeleteRoleByIdCommandHandler } from './application/delete/delete-role-by-id.command-handler';
import { DeleteRolesCommandHandler } from './application/delete/delete-roles.command-handler';

// queries
import { PaginateRolesQueryHandler } from './application/paginate/paginate-roles.query-handler';
import { GetRolesQueryHandler } from './application/get/get-roles.query-handler';
import { FindRoleQueryHandler } from './application/find/find-role.query-handler';
import { FindRoleByIdQueryHandler } from './application/find/find-role-by-id.query-handler';

// events
import { CreatedRoleEventHandler } from './application/events/created-role.event-handler';
import { UpdatedRoleEventHandler } from './application/events/updated-role.event-handler';
import { DeletedRoleEventHandler } from './application/events/deleted-role.event-handler';

// services
import { CreateRoleService } from './application/create/create-role.service';
import { InsertRolesService } from './application/insert/insert-roles.service';
import { PaginateRolesService } from './application/paginate/paginate-roles.service';
import { GetRolesService } from './application/get/get-roles.service';
import { FindRoleService } from './application/find/find-role.service';
import { FindRoleByIdService } from './application/find/find-role-by-id.service';
import { UpdateRoleService } from './application/update/update-role.service';
import { DeleteRoleByIdService } from './application/delete/delete-role-by-id.service';
import { DeleteRolesService } from './application/delete/delete-roles.service';

// models
export { BplusItSappiRoleModel } from './infrastructure/sequelize/sequelize-role.model';


// repository
export { IRoleRepository } from './domain/role.repository';
export { SequelizeRoleRepository } from './infrastructure/sequelize/sequelize-role.repository';

// sagas
export { RoleSagas } from './application/sagas/role.sagas';

export const BplusItSappiRoleHandlers = [
    // commands
    CreateRoleCommandHandler,
    InsertRolesCommandHandler,
    UpdateRoleCommandHandler,
    DeleteRoleByIdCommandHandler,
    DeleteRolesCommandHandler,

    // queries
    PaginateRolesQueryHandler,
    GetRolesQueryHandler,
    FindRoleQueryHandler,
    FindRoleByIdQueryHandler,

    // events
    CreatedRoleEventHandler,
    UpdatedRoleEventHandler,
    DeletedRoleEventHandler,
];

export const BplusItSappiRoleServices = [
    CreateRoleService,
    InsertRolesService,
    PaginateRolesService,
    GetRolesService,
    FindRoleService,
    FindRoleByIdService,
    UpdateRoleService,
    DeleteRoleByIdService,
    DeleteRolesService,
];