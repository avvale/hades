import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class PaginateJobsOverviewQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = [],
        public constraint: QueryStatementInput[] = [],
    ) {}
}