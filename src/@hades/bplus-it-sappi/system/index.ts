// commands
import { CreateSystemCommandHandler } from './application/create/create-system.command-handler';
import { InsertSystemsCommandHandler } from './application/insert/insert-systems.command-handler';
import { UpdateSystemCommandHandler } from './application/update/update-system.command-handler';
import { DeleteSystemByIdCommandHandler } from './application/delete/delete-system-by-id.command-handler';
import { DeleteSystemsCommandHandler } from './application/delete/delete-systems.command-handler';

// queries
import { PaginateSystemsQueryHandler } from './application/paginate/paginate-systems.query-handler';
import { GetSystemsQueryHandler } from './application/get/get-systems.query-handler';
import { FindSystemQueryHandler } from './application/find/find-system.query-handler';
import { FindSystemByIdQueryHandler } from './application/find/find-system-by-id.query-handler';

// events
import { CreatedSystemEventHandler } from './application/events/created-system.event-handler';
import { UpdatedSystemEventHandler } from './application/events/updated-system.event-handler';
import { DeletedSystemEventHandler } from './application/events/deleted-system.event-handler';

// services
import { CreateSystemService } from './application/create/create-system.service';
import { InsertSystemsService } from './application/insert/insert-systems.service';
import { PaginateSystemsService } from './application/paginate/paginate-systems.service';
import { GetSystemsService } from './application/get/get-systems.service';
import { FindSystemService } from './application/find/find-system.service';
import { FindSystemByIdService } from './application/find/find-system-by-id.service';
import { UpdateSystemService } from './application/update/update-system.service';
import { DeleteSystemByIdService } from './application/delete/delete-system-by-id.service';
import { DeleteSystemsService } from './application/delete/delete-systems.service';

// models
export { BplusItSappiSystemModel } from './infrastructure/sequelize/sequelize-system.model';


// repository
export { ISystemRepository } from './domain/system.repository';
export { SequelizeSystemRepository } from './infrastructure/sequelize/sequelize-system.repository';

// sagas
export { SystemSagas } from './application/sagas/system.sagas';

export const BplusItSappiSystemHandlers = [
    // commands
    CreateSystemCommandHandler,
    InsertSystemsCommandHandler,
    UpdateSystemCommandHandler,
    DeleteSystemByIdCommandHandler,
    DeleteSystemsCommandHandler,

    // queries
    PaginateSystemsQueryHandler,
    GetSystemsQueryHandler,
    FindSystemQueryHandler,
    FindSystemByIdQueryHandler,

    // events
    CreatedSystemEventHandler,
    UpdatedSystemEventHandler,
    DeletedSystemEventHandler,
];

export const BplusItSappiSystemServices = [
    CreateSystemService,
    InsertSystemsService,
    PaginateSystemsService,
    GetSystemsService,
    FindSystemService,
    FindSystemByIdService,
    UpdateSystemService,
    DeleteSystemByIdService,
    DeleteSystemsService,
];