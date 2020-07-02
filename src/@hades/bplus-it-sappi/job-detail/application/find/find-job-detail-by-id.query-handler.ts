import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobDetailResponse } from './../../domain/job-detail.response';
import { JobDetailId } from './../../domain/value-objects';
import { FindJobDetailByIdQuery } from './find-job-detail-by-id.query';
import { FindJobDetailByIdService } from './find-job-detail-by-id.service';

@QueryHandler(FindJobDetailByIdQuery)
export class FindJobDetailByIdQueryHandler implements IQueryHandler<FindJobDetailByIdQuery>
{
    constructor(
        private readonly findJobDetailByIdService: FindJobDetailByIdService
    ) { }

    async execute(query: FindJobDetailByIdQuery): Promise<JobDetailResponse>
    {
        const jobDetail = await this.findJobDetailByIdService.main(new JobDetailId(query.id));

        return new JobDetailResponse(
                jobDetail.id.value,
                jobDetail.tenantId.value,
                jobDetail.systemId.value,
                jobDetail.systemName.value,
                jobDetail.executionId.value,
                jobDetail.executionType.value,
                jobDetail.executionExecutedAt.value,
                jobDetail.executionMonitoringStartAt.value,
                jobDetail.executionMonitoringEndAt.value,
                jobDetail.status.value,
                jobDetail.detail.value,
                jobDetail.example.value,
                jobDetail.createdAt.value,
                jobDetail.updatedAt.value,
                jobDetail.deletedAt.value,
                
            );
    }
}