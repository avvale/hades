import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class PaginateLangsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = [],
        public constraint: QueryStatementInput[] = [],
    ) {}
}