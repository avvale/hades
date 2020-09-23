import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetRefreshTokensQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}