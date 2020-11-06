// commands
import { CreateExecutionCommandHandler } from './application/create/create-execution.command-handler';
import { CreateExecutionsCommandHandler } from './application/create/create-executions.command-handler';
import { UpdateExecutionCommandHandler } from './application/update/update-execution.command-handler';
import { DeleteExecutionByIdCommandHandler } from './application/delete/delete-execution-by-id.command-handler';
import { DeleteExecutionsCommandHandler } from './application/delete/delete-executions.command-handler';

// queries
import { PaginateExecutionsQueryHandler } from './application/paginate/paginate-executions.query-handler';
import { GetExecutionsQueryHandler } from './application/get/get-executions.query-handler';
import { FindExecutionQueryHandler } from './application/find/find-execution.query-handler';
import { FindExecutionByIdQueryHandler } from './application/find/find-execution-by-id.query-handler';

// events
import { CreatedExecutionEventHandler } from './application/events/created-execution.event-handler';
import { CreatedExecutionsEventHandler } from './application/events/created-executions.event-handler';
import { UpdatedExecutionEventHandler } from './application/events/updated-execution.event-handler';
import { DeletedExecutionEventHandler } from './application/events/deleted-execution.event-handler';
import { DeletedExecutionsEventHandler } from './application/events/deleted-executions.event-handler';

// services
import { CreateExecutionService } from './application/create/create-execution.service';
import { CreateExecutionsService } from './application/create/create-executions.service';
import { PaginateExecutionsService } from './application/paginate/paginate-executions.service';
import { GetExecutionsService } from './application/get/get-executions.service';
import { FindExecutionService } from './application/find/find-execution.service';
import { FindExecutionByIdService } from './application/find/find-execution-by-id.service';
import { UpdateExecutionService } from './application/update/update-execution.service';
import { DeleteExecutionByIdService } from './application/delete/delete-execution-by-id.service';
import { DeleteExecutionsService } from './application/delete/delete-executions.service';

// models
export { CciExecutionModel } from './infrastructure/sequelize/sequelize-execution.model';

// repository
export { IExecutionRepository } from './domain/execution.repository';
export { SequelizeExecutionRepository } from './infrastructure/sequelize/sequelize-execution.repository';

// sagas
export { ExecutionSagas } from './application/sagas/execution.sagas';

export const CciExecutionHandlers = [
    // commands
    CreateExecutionCommandHandler,
    CreateExecutionsCommandHandler,
    UpdateExecutionCommandHandler,
    DeleteExecutionByIdCommandHandler,
    DeleteExecutionsCommandHandler,

    // queries
    PaginateExecutionsQueryHandler,
    GetExecutionsQueryHandler,
    FindExecutionQueryHandler,
    FindExecutionByIdQueryHandler,

    // events
    CreatedExecutionEventHandler,
    CreatedExecutionsEventHandler,
    UpdatedExecutionEventHandler,
    DeletedExecutionEventHandler,
    DeletedExecutionsEventHandler,
];

export const CciExecutionServices = [
    CreateExecutionService,
    CreateExecutionsService,
    PaginateExecutionsService,
    GetExecutionsService,
    FindExecutionService,
    FindExecutionByIdService,
    UpdateExecutionService,
    DeleteExecutionByIdService,
    DeleteExecutionsService,
];