import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobResponse } from './../../domain/job.response';
import { FindJobQuery } from './find-job.query';
import { FindJobService } from './find-job.service';

@QueryHandler(FindJobQuery)
export class FindJobQueryHandler implements IQueryHandler<FindJobQuery>
{
    constructor(
        private readonly findJobService: FindJobService
    ) { }

    async execute(query: FindJobQuery): Promise<JobResponse>
    {
        const job = await this.findJobService.main(query.queryStatements);

        return new JobResponse(
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
                
            );
    }
}