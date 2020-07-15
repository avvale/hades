import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class PaginateMessagesDetailQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = [],
        public constraint: QueryStatementInput[] = [],
    ) {}
}