// commands
import { CreateModuleCommandHandler } from './application/create/create-module.command-handler';
import { InsertModulesCommandHandler } from './application/insert/insert-modules.command-handler';
import { UpdateModuleCommandHandler } from './application/update/update-module.command-handler';
import { DeleteModuleByIdCommandHandler } from './application/delete/delete-module-by-id.command-handler';
import { DeleteModulesCommandHandler } from './application/delete/delete-modules.command-handler';

// queries
import { PaginateModulesQueryHandler } from './application/paginate/paginate-modules.query-handler';
import { GetModulesQueryHandler } from './application/get/get-modules.query-handler';
import { FindModuleQueryHandler } from './application/find/find-module.query-handler';
import { FindModuleByIdQueryHandler } from './application/find/find-module-by-id.query-handler';

// events
import { CreatedModuleEventHandler } from './application/events/created-module.event-handler';
import { UpdatedModuleEventHandler } from './application/events/updated-module.event-handler';
import { DeletedModuleEventHandler } from './application/events/deleted-module.event-handler';

// services
import { CreateModuleService } from './application/create/create-module.service';
import { InsertModulesService } from './application/insert/insert-modules.service';
import { PaginateModulesService } from './application/paginate/paginate-modules.service';
import { GetModulesService } from './application/get/get-modules.service';
import { FindModuleService } from './application/find/find-module.service';
import { FindModuleByIdService } from './application/find/find-module-by-id.service';
import { UpdateModuleService } from './application/update/update-module.service';
import { DeleteModuleByIdService } from './application/delete/delete-module-by-id.service';
import { DeleteModulesService } from './application/delete/delete-modules.service';

// models
export { BplusItSappiModuleModel } from './infrastructure/sequelize/sequelize-module.model';


// repository
export { IModuleRepository } from './domain/module.repository';
export { SequelizeModuleRepository } from './infrastructure/sequelize/sequelize-module.repository';

// sagas
export { ModuleSagas } from './application/sagas/module.sagas';

export const BplusItSappiModuleHandlers = [
    // commands
    CreateModuleCommandHandler,
    InsertModulesCommandHandler,
    UpdateModuleCommandHandler,
    DeleteModuleByIdCommandHandler,
    DeleteModulesCommandHandler,

    // queries
    PaginateModulesQueryHandler,
    GetModulesQueryHandler,
    FindModuleQueryHandler,
    FindModuleByIdQueryHandler,

    // events
    CreatedModuleEventHandler,
    UpdatedModuleEventHandler,
    DeletedModuleEventHandler,
];

export const BplusItSappiModuleServices = [
    CreateModuleService,
    InsertModulesService,
    PaginateModulesService,
    GetModulesService,
    FindModuleService,
    FindModuleByIdService,
    UpdateModuleService,
    DeleteModuleByIdService,
    DeleteModulesService,
];