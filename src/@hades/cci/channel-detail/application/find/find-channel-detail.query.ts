import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindChannelDetailQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}