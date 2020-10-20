import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetDashboardJobsOverviewQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}