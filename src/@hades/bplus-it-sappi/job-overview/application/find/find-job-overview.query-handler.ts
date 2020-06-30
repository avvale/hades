import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobOverviewResponse } from './../../domain/job-overview.response';
import { FindJobOverviewQuery } from './find-job-overview.query';
import { FindJobOverviewService } from './find-job-overview.service';

@QueryHandler(FindJobOverviewQuery)
export class FindJobOverviewQueryHandler implements IQueryHandler<FindJobOverviewQuery>
{
    constructor(
        private readonly findJobOverviewService: FindJobOverviewService
    ) { }

    async execute(query: FindJobOverviewQuery): Promise<JobOverviewResponse>
    {
        const jobOverview = await this.findJobOverviewService.main(query.queryStatements);

        return new JobOverviewResponse(
                jobOverview.id.value,
                jobOverview.tenantId.value,
                jobOverview.systemId.value,
                jobOverview.executionType.value,
                jobOverview.executionExecutedAt.value,
                jobOverview.executionMonitoringStartAt.value,
                jobOverview.executionMonitoringEndAt.value,
                jobOverview.cancelled.value,
                jobOverview.completed.value,
                jobOverview.error.value,
                jobOverview.createdAt.value,
                jobOverview.updatedAt.value,
                jobOverview.deletedAt.value,
                
            );
    }
}