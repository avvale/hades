// commands
import { CreateSystemCommandHandler } from './application/create/create-system.command-handler';
import { CreateSystemsCommandHandler } from './application/create/create-systems.command-handler';
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
import { CreatedSystemsEventHandler } from './application/events/created-systems.event-handler';
import { UpdatedSystemEventHandler } from './application/events/updated-system.event-handler';
import { DeletedSystemEventHandler } from './application/events/deleted-system.event-handler';
import { DeletedSystemsEventHandler } from './application/events/deleted-systems.event-handler';

// services
import { CreateSystemService } from './application/create/create-system.service';
import { CreateSystemsService } from './application/create/create-systems.service';
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
    CreateSystemsCommandHandler,
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
    CreatedSystemsEventHandler,
    UpdatedSystemEventHandler,
    DeletedSystemEventHandler,
    DeletedSystemsEventHandler,
];

export const BplusItSappiSystemServices = [
    CreateSystemService,
    CreateSystemsService,
    PaginateSystemsService,
    GetSystemsService,
    FindSystemService,
    FindSystemByIdService,
    UpdateSystemService,
    DeleteSystemByIdService,
    DeleteSystemsService,
];