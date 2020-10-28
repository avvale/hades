import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetDashboardChannelsOverviewQuery
{
    constructor(
        public tenantIds: string[],
        public systemIds: string[],
    ) {}
}