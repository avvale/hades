import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { CciJobOverview } from './../../domain/job-overview.aggregate';

@Injectable()
export class GetDashboardJobsOverviewService
{
    constructor(
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciJobOverview[]>
    {
        return await this.repository.getDashboardData(tenantIds, systemIds, cQMetadata);
    }
}