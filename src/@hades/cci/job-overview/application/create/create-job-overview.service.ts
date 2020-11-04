import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
export class CreateJobOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobOverviewRepository,
    ) {}

    public async main(
        payload: {
            id: JobOverviewId,
            tenantId: JobOverviewTenantId,
            tenantCode: JobOverviewTenantCode,
            systemId: JobOverviewSystemId,
            systemName: JobOverviewSystemName,
            executionId: JobOverviewExecutionId,
            executionType: JobOverviewExecutionType,
            executionExecutedAt: JobOverviewExecutionExecutedAt,
            executionMonitoringStartAt: JobOverviewExecutionMonitoringStartAt,
            executionMonitoringEndAt: JobOverviewExecutionMonitoringEndAt,
            cancelled: JobOverviewCancelled,
            completed: JobOverviewCompleted,
            error: JobOverviewError,
        },
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
            new JobOverviewCreatedAt({currentTimestamp: true}),
            new JobOverviewUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(jobOverview);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const jobOverviewRegister = this.publisher.mergeObjectContext(
            jobOverview
        );

        jobOverviewRegister.created(jobOverview); // apply event to model events
        jobOverviewRegister.commit(); // commit all events of model
    }
}