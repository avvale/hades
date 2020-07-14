import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobDetailResponse } from './../../domain/job-detail.response';
import { JobDetailMapper } from './../../domain/job-detail.mapper';
import { FindJobDetailQuery } from './find-job-detail.query';
import { FindJobDetailService } from './find-job-detail.service';

@QueryHandler(FindJobDetailQuery)
export class FindJobDetailQueryHandler implements IQueryHandler<FindJobDetailQuery>
{
    private readonly mapper: JobDetailMapper = new JobDetailMapper();

    constructor(
        private readonly findJobDetailService: FindJobDetailService
    ) { }

    async execute(query: FindJobDetailQuery): Promise<JobDetailResponse>
    {
        const jobDetail = await this.findJobDetailService.main(query.queryStatements);

        return this.mapper.mapAggregateToResponse(jobDetail);
    }
}