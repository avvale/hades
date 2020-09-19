import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class PaginateApplicationsQuery
{
    constructor(
        public queryStatement: QueryStatement,
        public constraint: QueryStatement = {},
    ) {}
}