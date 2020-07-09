// controllers
import { CreateSummaryController } from './controllers/create-summary.controller';
import { InsertSummariesController } from './controllers/insert-summaries.controller';
import { PaginateSummariesController } from './controllers/paginate-summaries.controller';
import { GetSummariesController } from './controllers/get-summaries.controller';
import { FindSummaryByIdController } from './controllers/find-summary-by-id.controller';
import { FindSummaryController } from './controllers/find-summary.controller';
import { UpdateSummaryController } from './controllers/update-summary.controller';
import { DeleteSummaryByIdController } from './controllers/delete-summary-by-id.controller';
import { DeleteSummariesController } from './controllers/delete-summaries.controller';

// resolvers
import { CreateSummaryResolver } from './resolvers/create-summary.resolver';
import { InsertSummariesResolver } from './resolvers/insert-summaries.resolver';
import { PaginateSummariesResolver } from './resolvers/paginate-summaries.resolver';
import { GetSummariesResolver } from './resolvers/get-summaries.resolver';
import { FindSummaryResolver } from './resolvers/find-summary.resolver';
import { FindSummaryByIdResolver } from './resolvers/find-summary-by-id.resolver';
import { UpdateSummaryResolver } from './resolvers/update-summary.resolver';
import { DeleteSummaryByIdResolver } from './resolvers/delete-summary-by-id.resolver';
import { DeleteSummariesResolver } from './resolvers/delete-summaries.resolver';

export const NfcSummaryControllers = [
    CreateSummaryController,
    InsertSummariesController,
    PaginateSummariesController,
    GetSummariesController,
    FindSummaryByIdController,
    FindSummaryController,
    UpdateSummaryController,
    DeleteSummaryByIdController,
    DeleteSummariesController,
];

export const NfcSummaryResolvers = [
    CreateSummaryResolver,
    InsertSummariesResolver,
    PaginateSummariesResolver,
    GetSummariesResolver,
    FindSummaryResolver,
    FindSummaryByIdResolver,
    UpdateSummaryResolver,
    DeleteSummaryByIdResolver,
    DeleteSummariesResolver,
];