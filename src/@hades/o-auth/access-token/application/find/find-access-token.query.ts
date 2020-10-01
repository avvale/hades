import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindAccessTokenQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}