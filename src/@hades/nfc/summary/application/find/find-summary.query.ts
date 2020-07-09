import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindSummaryQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}