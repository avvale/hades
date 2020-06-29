import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetJobsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}