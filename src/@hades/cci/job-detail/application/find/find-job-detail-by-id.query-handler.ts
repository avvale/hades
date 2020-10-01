import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobDetailResponse } from './../../domain/job-detail.response';
import { JobDetailMapper } from './../../domain/job-detail.mapper';
import { JobDetailId } from './../../domain/value-objects';
import { FindJobDetailByIdQuery } from './find-job-detail-by-id.query';
import { FindJobDetailByIdService } from './find-job-detail-by-id.service';

@QueryHandler(FindJobDetailByIdQuery)
export class FindJobDetailByIdQueryHandler implements IQueryHandler<FindJobDetailByIdQuery>
{
    private readonly mapper: JobDetailMapper = new JobDetailMapper();

    constructor(
        private readonly findJobDetailByIdService: FindJobDetailByIdService
    ) { }

    async execute(query: FindJobDetailByIdQuery): Promise<JobDetailResponse>
    {
        const jobDetail = await this.findJobDetailByIdService.main(new JobDetailId(query.id));

        return this.mapper.mapAggregateToResponse(jobDetail);
    }
}