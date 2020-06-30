import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobOverviewResponse } from './../../domain/job-overview.response';
import { JobOverviewId } from './../../domain/value-objects';
import { FindJobOverviewByIdQuery } from './find-job-overview-by-id.query';
import { FindJobOverviewByIdService } from './find-job-overview-by-id.service';

@QueryHandler(FindJobOverviewByIdQuery)
export class FindJobOverviewByIdQueryHandler implements IQueryHandler<FindJobOverviewByIdQuery>
{
    constructor(
        private readonly findJobOverviewByIdService: FindJobOverviewByIdService
    ) { }

    async execute(query: FindJobOverviewByIdQuery): Promise<JobOverviewResponse>
    {
        const jobOverview = await this.findJobOverviewByIdService.main(new JobOverviewId(query.id));

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