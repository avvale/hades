import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetDashboardMessagesOverviewQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}