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
import { BplusItSappiJobOverview } from './../../domain/job-overview.entity';

@Injectable()
export class CreateJobOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(
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
        
    ): Promise<void>
    {
        // create object with factory pattern
        const jobOverview = BplusItSappiJobOverview.register(
            id,
            tenantId,
            systemId,
            systemName,
            executionId,
            executionType,
            executionExecutedAt,
            executionMonitoringStartAt,
            executionMonitoringEndAt,
            cancelled,
            completed,
            error,
            new JobOverviewCreatedAt(Utils.nowTimestamp()),
            new JobOverviewUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(jobOverview);

        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const jobOverviewRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        jobOverviewRegister.created(jobOverview); // apply event to model events
        jobOverviewRegister.commit(); // commit all events of model
    }
}