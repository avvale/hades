import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class PaginateRolesQuery
{
    constructor(
        public queryStatement?: QueryStatement,
        public constraint?: QueryStatement
    ) {}
}