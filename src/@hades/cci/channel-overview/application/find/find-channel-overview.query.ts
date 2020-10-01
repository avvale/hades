import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindChannelOverviewQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}