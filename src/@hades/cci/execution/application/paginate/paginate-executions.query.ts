import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class PaginateExecutionsQuery
{
    constructor(
        public queryStatement?: QueryStatement,
        public constraint?: QueryStatement,
    ) {}
}