import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindChannelQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}