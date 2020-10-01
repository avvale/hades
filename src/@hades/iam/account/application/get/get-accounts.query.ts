import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetAccountsQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}