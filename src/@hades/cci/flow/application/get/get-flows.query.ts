import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetFlowsQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}