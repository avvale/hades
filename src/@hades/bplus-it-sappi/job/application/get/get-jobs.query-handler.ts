import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobResponse } from './../../domain/job.response';
import { GetJobsQuery } from './get-jobs.query';
import { GetJobsService } from './get-jobs.service';

@QueryHandler(GetJobsQuery)
export class GetJobsQueryHandler implements IQueryHandler<GetJobsQuery>
{
    constructor(
        private readonly getJobsService: GetJobsService
    ) { }

    async execute(query: GetJobsQuery): Promise<JobResponse[]>
    {
        return (await this.getJobsService.main(query.queryStatements)).map(job => new JobResponse(
                job.id.value,
                job.tenantId.value,
                job.systemId.value,
                job.systemName.value,
                job.executionId.value,
                job.executionType.value,
                job.executionExecutedAt.value,
                job.executionMonitoringStartAt.value,
                job.executionMonitoringEndAt.value,
                job.cancelled.value,
                job.completed.value,
                job.error.value,
                job.createdAt.value,
                job.updatedAt.value,
                job.deletedAt.value,
                
            ));
    }
}