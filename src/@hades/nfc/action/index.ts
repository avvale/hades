// commands
import { CreateActionCommandHandler } from './application/create/create-action.command-handler';
import { CreateActionsCommandHandler } from './application/create/create-actions.command-handler';
import { UpdateActionCommandHandler } from './application/update/update-action.command-handler';
import { DeleteActionByIdCommandHandler } from './application/delete/delete-action-by-id.command-handler';
import { DeleteActionsCommandHandler } from './application/delete/delete-actions.command-handler';

// queries
import { PaginateActionsQueryHandler } from './application/paginate/paginate-actions.query-handler';
import { GetActionsQueryHandler } from './application/get/get-actions.query-handler';
import { FindActionQueryHandler } from './application/find/find-action.query-handler';
import { FindActionByIdQueryHandler } from './application/find/find-action-by-id.query-handler';

// events
import { CreatedActionEventHandler } from './application/events/created-action.event-handler';
import { CreatedActionsEventHandler } from './application/events/created-actions.event-handler';
import { UpdatedActionEventHandler } from './application/events/updated-action.event-handler';
import { DeletedActionEventHandler } from './application/events/deleted-action.event-handler';
import { DeletedActionsEventHandler } from './application/events/deleted-actions.event-handler';

// services
import { CreateActionService } from './application/create/create-action.service';
import { CreateActionsService } from './application/create/create-actions.service';
import { PaginateActionsService } from './application/paginate/paginate-actions.service';
import { GetActionsService } from './application/get/get-actions.service';
import { FindActionService } from './application/find/find-action.service';
import { FindActionByIdService } from './application/find/find-action-by-id.service';
import { UpdateActionService } from './application/update/update-action.service';
import { DeleteActionByIdService } from './application/delete/delete-action-by-id.service';
import { DeleteActionsService } from './application/delete/delete-actions.service';

// models
export { NfcActionModel } from './infrastructure/sequelize/sequelize-action.model';


// repository
export { IActionRepository } from './domain/action.repository';
export { SequelizeActionRepository } from './infrastructure/sequelize/sequelize-action.repository';

// sagas
export { ActionSagas } from './application/sagas/action.sagas';

export const NfcActionHandlers = [
    // commands
    CreateActionCommandHandler,
    CreateActionsCommandHandler,
    UpdateActionCommandHandler,
    DeleteActionByIdCommandHandler,
    DeleteActionsCommandHandler,

    // queries
    PaginateActionsQueryHandler,
    GetActionsQueryHandler,
    FindActionQueryHandler,
    FindActionByIdQueryHandler,

    // events
    CreatedActionEventHandler,
    CreatedActionsEventHandler,
    UpdatedActionEventHandler,
    DeletedActionEventHandler,
    DeletedActionsEventHandler,
];

export const NfcActionServices = [
    CreateActionService,
    CreateActionsService,
    PaginateActionsService,
    GetActionsService,
    FindActionService,
    FindActionByIdService,
    UpdateActionService,
    DeleteActionByIdService,
    DeleteActionsService,
];