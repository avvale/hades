import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobOverviewResponse } from './../../domain/job-overview.response';
import { JobOverviewMapper } from './../../domain/job-overview.mapper';
import { GetJobsOverviewQuery } from './get-jobs-overview.query';
import { GetJobsOverviewService } from './get-jobs-overview.service';

@QueryHandler(GetJobsOverviewQuery)
export class GetJobsOverviewQueryHandler implements IQueryHandler<GetJobsOverviewQuery>
{
    private readonly mapper: JobOverviewMapper = new JobOverviewMapper();

    constructor(
        private readonly getJobsOverviewService: GetJobsOverviewService
    ) { }

    async execute(query: GetJobsOverviewQuery): Promise<JobOverviewResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getJobsOverviewService.main(query.queryStatements));
    }
}