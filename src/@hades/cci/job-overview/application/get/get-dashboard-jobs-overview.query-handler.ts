import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobOverviewResponse } from '../../domain/job-overview.response';
import { JobOverviewMapper } from '../../domain/job-overview.mapper';
import { GetDashboardJobsOverviewQuery } from './get-dashboard-jobs-overview.query';
import { GetDashboardJobsOverviewService } from './get-dashboard-jobs-overview.service';

@QueryHandler(GetDashboardJobsOverviewQuery)
export class GetDashboardJobsOverviewQueryHandler implements IQueryHandler<GetDashboardJobsOverviewQuery>
{
    private readonly mapper: JobOverviewMapper = new JobOverviewMapper();

    constructor(
        private readonly getDashboardJobsOverviewService: GetDashboardJobsOverviewService
    ) { }

    async execute(query: GetDashboardJobsOverviewQuery): Promise<JobOverviewResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getDashboardJobsOverviewService.main(query.tenantIds, query.systemIds, query.cQMetadata));
    }
}