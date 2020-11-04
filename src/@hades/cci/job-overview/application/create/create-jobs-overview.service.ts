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
import { AddJobsOverviewContextEvent } from './../events/add-jobs-overview-context.event';

@Injectable()
export class CreateJobsOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobOverviewRepository,
    ) {}

    public async main(
        jobsOverview: {
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
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateJobsOverview = jobsOverview.map(jobOverview => CciJobOverview.register(
            jobOverview.id,
            jobOverview.tenantId,
            jobOverview.tenantCode,
            jobOverview.systemId,
            jobOverview.systemName,
            jobOverview.executionId,
            jobOverview.executionType,
            jobOverview.executionExecutedAt,
            jobOverview.executionMonitoringStartAt,
            jobOverview.executionMonitoringEndAt,
            jobOverview.cancelled,
            jobOverview.completed,
            jobOverview.error,
            new JobOverviewCreatedAt({currentTimestamp: true}),
            new JobOverviewUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateJobsOverview);

        // create AddJobsOverviewContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const jobsOverviewRegistered = this.publisher.mergeObjectContext(new AddJobsOverviewContextEvent(aggregateJobsOverview));

        jobsOverviewRegistered.created(); // apply event to model events
        jobsOverviewRegistered.commit(); // commit all events of model
    }
}