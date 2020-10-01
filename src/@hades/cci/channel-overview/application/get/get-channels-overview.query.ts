import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetChannelsOverviewQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}