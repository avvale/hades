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
import { IJobOverviewRepository } from '../../domain/job-overview.repository';
import { BplusItSappiJobOverview } from './../../domain/job-overview.entity';

@Injectable()
export class InsertJobsOverviewService
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
        const entityJobsOverview = jobsOverview.map(jobOverview => BplusItSappiJobOverview.register(
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
        await this.repository.insert(entityJobsOverview);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const jobsOverviewRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // jobsOverviewRegistered.created(jobsOverview); // apply event to model events
        // jobsOverviewRegistered.commit(); // commit all events of model
    }
}