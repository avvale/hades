import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetJobsOverviewQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}