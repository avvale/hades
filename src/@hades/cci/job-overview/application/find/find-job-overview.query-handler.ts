import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobOverviewResponse } from './../../domain/job-overview.response';
import { JobOverviewMapper } from './../../domain/job-overview.mapper';
import { FindJobOverviewQuery } from './find-job-overview.query';
import { FindJobOverviewService } from './find-job-overview.service';

@QueryHandler(FindJobOverviewQuery)
export class FindJobOverviewQueryHandler implements IQueryHandler<FindJobOverviewQuery>
{
    private readonly mapper: JobOverviewMapper = new JobOverviewMapper();

    constructor(
        private readonly findJobOverviewService: FindJobOverviewService,
    ) {}

    async execute(query: FindJobOverviewQuery): Promise<JobOverviewResponse>
    {
        const jobOverview = await this.findJobOverviewService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(jobOverview);
    }
}