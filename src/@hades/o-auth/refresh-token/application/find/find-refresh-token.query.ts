import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindRefreshTokenQuery
{
    constructor(
        public queryStatement: QueryStatement
    ) {}
}