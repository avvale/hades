// commands
import { CreateExecutionCommandHandler } from './application/create/create-execution.command-handler';
import { InsertExecutionsCommandHandler } from './application/insert/insert-executions.command-handler';
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
import { UpdatedExecutionEventHandler } from './application/events/updated-execution.event-handler';
import { DeletedExecutionEventHandler } from './application/events/deleted-execution.event-handler';

// services
import { CreateExecutionService } from './application/create/create-execution.service';
import { InsertExecutionsService } from './application/insert/insert-executions.service';
import { PaginateExecutionsService } from './application/paginate/paginate-executions.service';
import { GetExecutionsService } from './application/get/get-executions.service';
import { FindExecutionService } from './application/find/find-execution.service';
import { FindExecutionByIdService } from './application/find/find-execution-by-id.service';
import { UpdateExecutionService } from './application/update/update-execution.service';
import { DeleteExecutionByIdService } from './application/delete/delete-execution-by-id.service';
import { DeleteExecutionsService } from './application/delete/delete-executions.service';

// models
export { BplusItSappiExecutionModel } from './infrastructure/sequelize/sequelize-execution.model';


// repository
export { IExecutionRepository } from './domain/execution.repository';
export { SequelizeExecutionRepository } from './infrastructure/sequelize/sequelize-execution.repository';

// sagas
export { ExecutionSagas } from './application/sagas/execution.sagas';

export const BplusItSappiExecutionHandlers = [
    // commands
    CreateExecutionCommandHandler,
    InsertExecutionsCommandHandler,
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
    UpdatedExecutionEventHandler,
    DeletedExecutionEventHandler,
];

export const BplusItSappiExecutionServices = [
    CreateExecutionService,
    InsertExecutionsService,
    PaginateExecutionsService,
    GetExecutionsService,
    FindExecutionService,
    FindExecutionByIdService,
    UpdateExecutionService,
    DeleteExecutionByIdService,
    DeleteExecutionsService,
];