import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindJobDetailQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}