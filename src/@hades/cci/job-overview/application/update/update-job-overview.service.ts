import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import {
    JobOverviewId,
    JobOverviewTenantId,
    JobOverviewTenantCode,
    JobOverviewSystemId,
    JobOverviewSystemName,
    JobOverviewExecutionId,
    JobOverviewExecutionType,
    JobOverviewExecutionExecutedAt,
    JobOverviewExecutionMonitoringStartAt,
    JobOverviewExecutionMonitoringEndAt,
    JobOverviewCancelled,
    JobOverviewCompleted,
    JobOverviewError,
    JobOverviewCreatedAt,
    JobOverviewUpdatedAt,
    JobOverviewDeletedAt,
} from './../../domain/value-objects';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { CciJobOverview } from './../../domain/job-overview.aggregate';

@Injectable()
export class UpdateJobOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobOverviewRepository,
    ) {}

    public async main(
        payload: {
            id: JobOverviewId,
            tenantId?: JobOverviewTenantId,
            tenantCode?: JobOverviewTenantCode,
            systemId?: JobOverviewSystemId,
            systemName?: JobOverviewSystemName,
            executionId?: JobOverviewExecutionId,
            executionType?: JobOverviewExecutionType,
            executionExecutedAt?: JobOverviewExecutionExecutedAt,
            executionMonitoringStartAt?: JobOverviewExecutionMonitoringStartAt,
            executionMonitoringEndAt?: JobOverviewExecutionMonitoringEndAt,
            cancelled?: JobOverviewCancelled,
            completed?: JobOverviewCompleted,
            error?: JobOverviewError,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const jobOverview = CciJobOverview.register(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.cancelled,
            payload.completed,
            payload.error,
            null,
            new JobOverviewUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(jobOverview, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const jobOverviewRegister = this.publisher.mergeObjectContext(
            jobOverview
        );

        jobOverviewRegister.updated(jobOverview); // apply event to model events
        jobOverviewRegister.commit(); // commit all events of model
    }
}