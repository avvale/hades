import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetTenantsQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}