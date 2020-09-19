import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindClientQuery
{
    constructor(
        public queryStatement: QueryStatement
    ) {}
}