import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    JobId, 
    JobTenantId, 
    JobSystemId, 
    JobSystemName, 
    JobExecutionId, 
    JobExecutionType, 
    JobExecutionExecutedAt, 
    JobExecutionMonitoringStartAt, 
    JobExecutionMonitoringEndAt, 
    JobCancelled, 
    JobCompleted, 
    JobError, 
    JobCreatedAt, 
    JobUpdatedAt, 
    JobDeletedAt
    
} from './../../domain/value-objects';
import { IJobRepository } from './../../domain/job.repository';
import { BplusItSappiJob } from './../../domain/job.entity';

@Injectable()
export class UpdateJobService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobRepository
    ) {}

    public async main(
        id: JobId,
        tenantId?: JobTenantId,
        systemId?: JobSystemId,
        systemName?: JobSystemName,
        executionId?: JobExecutionId,
        executionType?: JobExecutionType,
        executionExecutedAt?: JobExecutionExecutedAt,
        executionMonitoringStartAt?: JobExecutionMonitoringStartAt,
        executionMonitoringEndAt?: JobExecutionMonitoringEndAt,
        cancelled?: JobCancelled,
        completed?: JobCompleted,
        error?: JobError,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const job = BplusItSappiJob.register(
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
            null,
            new JobUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(job);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const jobRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        jobRegister.updated(job); // apply event to model events
        jobRegister.commit(); // commit all events of model
    }
}