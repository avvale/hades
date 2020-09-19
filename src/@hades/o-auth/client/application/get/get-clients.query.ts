import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetClientsQuery
{
    constructor(
        public queryStatement: QueryStatement
    ) {}
}