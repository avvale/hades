// commands
import { CreateSummaryCommandHandler } from './application/create/create-summary.command-handler';
import { InsertSummariesCommandHandler } from './application/insert/insert-summaries.command-handler';
import { UpdateSummaryCommandHandler } from './application/update/update-summary.command-handler';
import { DeleteSummaryByIdCommandHandler } from './application/delete/delete-summary-by-id.command-handler';
import { DeleteSummariesCommandHandler } from './application/delete/delete-summaries.command-handler';

// queries
import { PaginateSummariesQueryHandler } from './application/paginate/paginate-summaries.query-handler';
import { GetSummariesQueryHandler } from './application/get/get-summaries.query-handler';
import { FindSummaryQueryHandler } from './application/find/find-summary.query-handler';
import { FindSummaryByIdQueryHandler } from './application/find/find-summary-by-id.query-handler';

// events
import { CreatedSummaryEventHandler } from './application/events/created-summary.event-handler';
import { UpdatedSummaryEventHandler } from './application/events/updated-summary.event-handler';
import { DeletedSummaryEventHandler } from './application/events/deleted-summary.event-handler';

// services
import { CreateSummaryService } from './application/create/create-summary.service';
import { InsertSummariesService } from './application/insert/insert-summaries.service';
import { PaginateSummariesService } from './application/paginate/paginate-summaries.service';
import { GetSummariesService } from './application/get/get-summaries.service';
import { FindSummaryService } from './application/find/find-summary.service';
import { FindSummaryByIdService } from './application/find/find-summary-by-id.service';
import { UpdateSummaryService } from './application/update/update-summary.service';
import { DeleteSummaryByIdService } from './application/delete/delete-summary-by-id.service';
import { DeleteSummariesService } from './application/delete/delete-summaries.service';

// models
export { NfcSummaryModel } from './infrastructure/sequelize/sequelize-summary.model';


// repository
export { ISummaryRepository } from './domain/summary.repository';
export { SequelizeSummaryRepository } from './infrastructure/sequelize/sequelize-summary.repository';

// sagas
export { SummarySagas } from './application/sagas/summary.sagas';

export const NfcSummaryHandlers = [
    // commands
    CreateSummaryCommandHandler,
    InsertSummariesCommandHandler,
    UpdateSummaryCommandHandler,
    DeleteSummaryByIdCommandHandler,
    DeleteSummariesCommandHandler,

    // queries
    PaginateSummariesQueryHandler,
    GetSummariesQueryHandler,
    FindSummaryQueryHandler,
    FindSummaryByIdQueryHandler,

    // events
    CreatedSummaryEventHandler,
    UpdatedSummaryEventHandler,
    DeletedSummaryEventHandler,
];

export const NfcSummaryServices = [
    CreateSummaryService,
    InsertSummariesService,
    PaginateSummariesService,
    GetSummariesService,
    FindSummaryService,
    FindSummaryByIdService,
    UpdateSummaryService,
    DeleteSummaryByIdService,
    DeleteSummariesService,
];