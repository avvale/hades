import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobDetailResponse } from './../../domain/job-detail.response';
import { GetJobsDetailQuery } from './get-jobs-detail.query';
import { GetJobsDetailService } from './get-jobs-detail.service';

@QueryHandler(GetJobsDetailQuery)
export class GetJobsDetailQueryHandler implements IQueryHandler<GetJobsDetailQuery>
{
    constructor(
        private readonly getJobsDetailService: GetJobsDetailService
    ) { }

    async execute(query: GetJobsDetailQuery): Promise<JobDetailResponse[]>
    {
        return (await this.getJobsDetailService.main(query.queryStatements)).map(jobDetail => new JobDetailResponse(
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
                
            ));
    }
}