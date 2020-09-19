import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class PaginateClientsQuery
{
    constructor(
        public queryStatement: QueryStatement,
        public constraint: QueryStatement = {},
    ) {}
}