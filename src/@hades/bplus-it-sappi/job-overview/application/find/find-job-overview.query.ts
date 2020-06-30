import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindJobOverviewQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}