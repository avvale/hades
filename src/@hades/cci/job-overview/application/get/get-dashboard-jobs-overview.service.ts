import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { CciJobOverview } from './../../domain/job-overview.aggregate';

@Injectable()
export class GetDashboardJobsOverviewService
{
    constructor(
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(tenantIds: string[], systemIds: string[]): Promise<CciJobOverview[]>
    {
        return await this.repository.getDashboardData(tenantIds, systemIds);
    }
}