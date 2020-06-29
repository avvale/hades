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
import { IJobRepository } from '../../domain/job.repository';
import { BplusItSappiJob } from './../../domain/job.entity';

@Injectable()
export class InsertJobsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobRepository
    ) {}

    public async main(
        jobs: {
            id: JobId,
            tenantId: JobTenantId,
            systemId: JobSystemId,
            systemName: JobSystemName,
            executionId: JobExecutionId,
            executionType: JobExecutionType,
            executionExecutedAt: JobExecutionExecutedAt,
            executionMonitoringStartAt: JobExecutionMonitoringStartAt,
            executionMonitoringEndAt: JobExecutionMonitoringEndAt,
            cancelled: JobCancelled,
            completed: JobCompleted,
            error: JobError,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const entityJobs = jobs.map(job => BplusItSappiJob.register(
            job.id,
            job.tenantId,
            job.systemId,
            job.systemName,
            job.executionId,
            job.executionType,
            job.executionExecutedAt,
            job.executionMonitoringStartAt,
            job.executionMonitoringEndAt,
            job.cancelled,
            job.completed,
            job.error,
            new JobCreatedAt(Utils.nowTimestamp()),
            new JobUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(entityJobs);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const jobsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // jobsRegistered.created(jobs); // apply event to model events
        // jobsRegistered.commit(); // commit all events of model
    }
}