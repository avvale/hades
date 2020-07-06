// commands
import { CreateFlowCommandHandler } from './application/create/create-flow.command-handler';
import { InsertFlowsCommandHandler } from './application/insert/insert-flows.command-handler';
import { UpdateFlowCommandHandler } from './application/update/update-flow.command-handler';
import { DeleteFlowByIdCommandHandler } from './application/delete/delete-flow-by-id.command-handler';
import { DeleteFlowsCommandHandler } from './application/delete/delete-flows.command-handler';

// queries
import { PaginateFlowsQueryHandler } from './application/paginate/paginate-flows.query-handler';
import { GetFlowsQueryHandler } from './application/get/get-flows.query-handler';
import { FindFlowQueryHandler } from './application/find/find-flow.query-handler';
import { FindFlowByIdQueryHandler } from './application/find/find-flow-by-id.query-handler';

// events
import { CreatedFlowEventHandler } from './application/events/created-flow.event-handler';
import { UpdatedFlowEventHandler } from './application/events/updated-flow.event-handler';
import { DeletedFlowEventHandler } from './application/events/deleted-flow.event-handler';

// services
import { CreateFlowService } from './application/create/create-flow.service';
import { InsertFlowsService } from './application/insert/insert-flows.service';
import { PaginateFlowsService } from './application/paginate/paginate-flows.service';
import { GetFlowsService } from './application/get/get-flows.service';
import { FindFlowService } from './application/find/find-flow.service';
import { FindFlowByIdService } from './application/find/find-flow-by-id.service';
import { UpdateFlowService } from './application/update/update-flow.service';
import { DeleteFlowByIdService } from './application/delete/delete-flow-by-id.service';
import { DeleteFlowsService } from './application/delete/delete-flows.service';

// models
export { BplusItSappiFlowModel } from './infrastructure/sequelize/sequelize-flow.model';
export { BplusItSappiFlowsContactsModel } from './infrastructure/sequelize/sequelize-flows-contacts.model';

// repository
export { IFlowRepository } from './domain/flow.repository';
export { SequelizeFlowRepository } from './infrastructure/sequelize/sequelize-flow.repository';

// sagas
export { FlowSagas } from './application/sagas/flow.sagas';

export const BplusItSappiFlowHandlers = [
    // commands
    CreateFlowCommandHandler,
    InsertFlowsCommandHandler,
    UpdateFlowCommandHandler,
    DeleteFlowByIdCommandHandler,
    DeleteFlowsCommandHandler,

    // queries
    PaginateFlowsQueryHandler,
    GetFlowsQueryHandler,
    FindFlowQueryHandler,
    FindFlowByIdQueryHandler,

    // events
    CreatedFlowEventHandler,
    UpdatedFlowEventHandler,
    DeletedFlowEventHandler,
];

export const BplusItSappiFlowServices = [
    CreateFlowService,
    InsertFlowsService,
    PaginateFlowsService,
    GetFlowsService,
    FindFlowService,
    FindFlowByIdService,
    UpdateFlowService,
    DeleteFlowByIdService,
    DeleteFlowsService,
];