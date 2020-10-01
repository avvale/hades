import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindExecutionQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}