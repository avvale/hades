import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobResponse } from './../../domain/job.response';
import { JobId } from './../../domain/value-objects';
import { FindJobByIdQuery } from './find-job-by-id.query';
import { FindJobByIdService } from './find-job-by-id.service';

@QueryHandler(FindJobByIdQuery)
export class FindJobByIdQueryHandler implements IQueryHandler<FindJobByIdQuery>
{
    constructor(
        private readonly findJobByIdService: FindJobByIdService
    ) { }

    async execute(query: FindJobByIdQuery): Promise<JobResponse>
    {
        const job = await this.findJobByIdService.main(new JobId(query.id));

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