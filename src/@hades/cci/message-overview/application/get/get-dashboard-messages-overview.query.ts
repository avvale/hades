import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetDashboardMessagesOverviewQuery
{
    constructor(
        public tenantIds: string[],
        public systemIds: string[],
    ) {}
}