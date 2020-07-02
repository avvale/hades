import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetJobsDetailQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}