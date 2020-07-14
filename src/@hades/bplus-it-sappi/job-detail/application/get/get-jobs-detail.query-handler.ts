import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobDetailResponse } from './../../domain/job-detail.response';
import { JobDetailMapper } from './../../domain/job-detail.mapper';
import { GetJobsDetailQuery } from './get-jobs-detail.query';
import { GetJobsDetailService } from './get-jobs-detail.service';

@QueryHandler(GetJobsDetailQuery)
export class GetJobsDetailQueryHandler implements IQueryHandler<GetJobsDetailQuery>
{
    private readonly mapper: JobDetailMapper = new JobDetailMapper();

    constructor(
        private readonly getJobsDetailService: GetJobsDetailService
    ) { }

    async execute(query: GetJobsDetailQuery): Promise<JobDetailResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getJobsDetailService.main(query.queryStatements));
    }
}