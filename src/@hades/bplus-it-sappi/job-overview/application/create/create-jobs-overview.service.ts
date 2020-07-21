import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    JobOverviewId, 
    JobOverviewTenantId, 
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
    JobOverviewDeletedAt
    
} from './../../domain/value-objects';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { BplusItSappiJobOverview } from './../../domain/job-overview.aggregate';
import { AddJobsOverviewContextEvent } from './../events/add-jobs-overview-context.event';

@Injectable()
export class CreateJobsOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(
        jobsOverview: {
            id: JobOverviewId,
            tenantId: JobOverviewTenantId,
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
        // create object with factory pattern
        const aggregateJobsOverview = jobsOverview.map(jobOverview => BplusItSappiJobOverview.register(
            jobOverview.id,
            jobOverview.tenantId,
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
            new JobOverviewCreatedAt(Utils.nowTimestamp()),
            new JobOverviewUpdatedAt(Utils.nowTimestamp()),
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