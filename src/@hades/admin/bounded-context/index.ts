// commands
import { CreateBoundedContextCommandHandler } from './application/create/create-bounded-context.command-handler';
import { InsertBoundedContextsCommandHandler } from './application/insert/insert-bounded-contexts.command-handler';
import { UpdateBoundedContextCommandHandler } from './application/update/update-bounded-context.command-handler';
import { DeleteBoundedContextByIdCommandHandler } from './application/delete/delete-bounded-context-by-id.command-handler';
import { DeleteBoundedContextsCommandHandler } from './application/delete/delete-bounded-contexts.command-handler';

// queries
import { PaginateBoundedContextsQueryHandler } from './application/paginate/paginate-bounded-contexts.query-handler';
import { GetBoundedContextsQueryHandler } from './application/get/get-bounded-contexts.query-handler';
import { FindBoundedContextQueryHandler } from './application/find/find-bounded-context.query-handler';
import { FindBoundedContextByIdQueryHandler } from './application/find/find-bounded-context-by-id.query-handler';

// events
import { CreatedBoundedContextEventHandler } from './application/events/created-bounded-context.event-handler';
import { UpdatedBoundedContextEventHandler } from './application/events/updated-bounded-context.event-handler';
import { DeletedBoundedContextEventHandler } from './application/events/deleted-bounded-context.event-handler';

// services
import { CreateBoundedContextService } from './application/create/create-bounded-context.service';
import { InsertBoundedContextsService } from './application/insert/insert-bounded-contexts.service';
import { PaginateBoundedContextsService } from './application/paginate/paginate-bounded-contexts.service';
import { GetBoundedContextsService } from './application/get/get-bounded-contexts.service';
import { FindBoundedContextService } from './application/find/find-bounded-context.service';
import { FindBoundedContextByIdService } from './application/find/find-bounded-context-by-id.service';
import { UpdateBoundedContextService } from './application/update/update-bounded-context.service';
import { DeleteBoundedContextByIdService } from './application/delete/delete-bounded-context-by-id.service';
import { DeleteBoundedContextsService } from './application/delete/delete-bounded-contexts.service';

// models
export { AdminBoundedContextModel } from './infrastructure/sequelize/sequelize-bounded-context.model';


// repository
export { IBoundedContextRepository } from './domain/bounded-context.repository';
export { SequelizeBoundedContextRepository } from './infrastructure/sequelize/sequelize-bounded-context.repository';

// sagas
export { BoundedContextSagas } from './application/sagas/bounded-context.sagas';

export const AdminBoundedContextHandlers = [
    // commands
    CreateBoundedContextCommandHandler,
    InsertBoundedContextsCommandHandler,
    UpdateBoundedContextCommandHandler,
    DeleteBoundedContextByIdCommandHandler,
    DeleteBoundedContextsCommandHandler,

    // queries
    PaginateBoundedContextsQueryHandler,
    GetBoundedContextsQueryHandler,
    FindBoundedContextQueryHandler,
    FindBoundedContextByIdQueryHandler,

    // events
    CreatedBoundedContextEventHandler,
    UpdatedBoundedContextEventHandler,
    DeletedBoundedContextEventHandler,
];

export const AdminBoundedContextServices = [
    CreateBoundedContextService,
    InsertBoundedContextsService,
    PaginateBoundedContextsService,
    GetBoundedContextsService,
    FindBoundedContextService,
    FindBoundedContextByIdService,
    UpdateBoundedContextService,
    DeleteBoundedContextByIdService,
    DeleteBoundedContextsService,
];