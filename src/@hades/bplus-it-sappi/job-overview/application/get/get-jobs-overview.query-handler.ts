import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobOverviewResponse } from './../../domain/job-overview.response';
import { GetJobsOverviewQuery } from './get-jobs-overview.query';
import { GetJobsOverviewService } from './get-jobs-overview.service';

@QueryHandler(GetJobsOverviewQuery)
export class GetJobsOverviewQueryHandler implements IQueryHandler<GetJobsOverviewQuery>
{
    constructor(
        private readonly getJobsOverviewService: GetJobsOverviewService
    ) { }

    async execute(query: GetJobsOverviewQuery): Promise<JobOverviewResponse[]>
    {
        return (await this.getJobsOverviewService.main(query.queryStatements)).map(jobOverview => new JobOverviewResponse(
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
                
            ));
    }
}