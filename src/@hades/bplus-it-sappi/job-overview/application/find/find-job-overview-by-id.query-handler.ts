import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobOverviewResponse } from './../../domain/job-overview.response';
import { JobOverviewMapper } from './../../domain/job-overview.mapper';
import { JobOverviewId } from './../../domain/value-objects';
import { FindJobOverviewByIdQuery } from './find-job-overview-by-id.query';
import { FindJobOverviewByIdService } from './find-job-overview-by-id.service';

@QueryHandler(FindJobOverviewByIdQuery)
export class FindJobOverviewByIdQueryHandler implements IQueryHandler<FindJobOverviewByIdQuery>
{
    private readonly mapper: JobOverviewMapper = new JobOverviewMapper();

    constructor(
        private readonly findJobOverviewByIdService: FindJobOverviewByIdService
    ) { }

    async execute(query: FindJobOverviewByIdQuery): Promise<JobOverviewResponse>
    {
        const jobOverview = await this.findJobOverviewByIdService.main(new JobOverviewId(query.id));

        return this.mapper.mapAggregateToResponse(jobOverview);
    }
}