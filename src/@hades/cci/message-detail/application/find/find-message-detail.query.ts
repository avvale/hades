import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindMessageDetailQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}