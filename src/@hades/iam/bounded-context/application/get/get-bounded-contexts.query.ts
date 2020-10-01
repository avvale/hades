import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetBoundedContextsQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}