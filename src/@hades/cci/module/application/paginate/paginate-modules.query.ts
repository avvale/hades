import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class PaginateModulesQuery
{
    constructor(
        public queryStatement?: QueryStatement,
        public constraint?: QueryStatement
    ) {}
}