import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindTenantQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}