import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobDetailResponse } from './../../domain/job-detail.response';
import { FindJobDetailQuery } from './find-job-detail.query';
import { FindJobDetailService } from './find-job-detail.service';

@QueryHandler(FindJobDetailQuery)
export class FindJobDetailQueryHandler implements IQueryHandler<FindJobDetailQuery>
{
    constructor(
        private readonly findJobDetailService: FindJobDetailService
    ) { }

    async execute(query: FindJobDetailQuery): Promise<JobDetailResponse>
    {
        const jobDetail = await this.findJobDetailService.main(query.queryStatements);

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