import { AggregateRoot } from '@nestjs/cqrs';
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
    
} from './value-objects';
import { CreatedJobEvent } from './../application/events/created-job.event';
import { UpdatedJobEvent } from './../application/events/updated-job.event';
import { DeletedJobEvent } from './../application/events/deleted-job.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.entity';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.entity';
import { BplusItSappiExecution } from '@hades/bplus-it-sappi/execution/domain/execution.entity';

export class BplusItSappiJob extends AggregateRoot
{
    id: JobId;
    tenantId: JobTenantId;
    tenant: AdminTenant;
    systemId: JobSystemId;
    system: BplusItSappiSystem;
    systemName: JobSystemName;
    executionId: JobExecutionId;
    execution: BplusItSappiExecution;
    executionType: JobExecutionType;
    executionExecutedAt: JobExecutionExecutedAt;
    executionMonitoringStartAt: JobExecutionMonitoringStartAt;
    executionMonitoringEndAt: JobExecutionMonitoringEndAt;
    cancelled: JobCancelled;
    completed: JobCompleted;
    error: JobError;
    createdAt: JobCreatedAt;
    updatedAt: JobUpdatedAt;
    deletedAt: JobDeletedAt;
    
    constructor(id?: JobId, tenantId?: JobTenantId, systemId?: JobSystemId, systemName?: JobSystemName, executionId?: JobExecutionId, executionType?: JobExecutionType, executionExecutedAt?: JobExecutionExecutedAt, executionMonitoringStartAt?: JobExecutionMonitoringStartAt, executionMonitoringEndAt?: JobExecutionMonitoringEndAt, cancelled?: JobCancelled, completed?: JobCompleted, error?: JobError, createdAt?: JobCreatedAt, updatedAt?: JobUpdatedAt, deletedAt?: JobDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.systemId = systemId;
        this.systemName = systemName;
        this.executionId = executionId;
        this.executionType = executionType;
        this.executionExecutedAt = executionExecutedAt;
        this.executionMonitoringStartAt = executionMonitoringStartAt;
        this.executionMonitoringEndAt = executionMonitoringEndAt;
        this.cancelled = cancelled;
        this.completed = completed;
        this.error = error;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: JobId,tenantId: JobTenantId,systemId: JobSystemId,systemName: JobSystemName,executionId: JobExecutionId,executionType: JobExecutionType,executionExecutedAt: JobExecutionExecutedAt,executionMonitoringStartAt: JobExecutionMonitoringStartAt,executionMonitoringEndAt: JobExecutionMonitoringEndAt,cancelled: JobCancelled,completed: JobCompleted,error: JobError,createdAt: JobCreatedAt,updatedAt: JobUpdatedAt,deletedAt: JobDeletedAt,): BplusItSappiJob
    {
        return new BplusItSappiJob(id, tenantId, systemId, systemName, executionId, executionType, executionExecutedAt, executionMonitoringStartAt, executionMonitoringEndAt, cancelled, completed, error, createdAt, updatedAt, deletedAt, );
    }

    created(job: BplusItSappiJob): void
    {
        this.apply(
            new CreatedJobEvent(
                job.id.value,
                job.tenantId.value,
                job.systemId.value,
                job.systemName.value,
                job.executionId.value,
                job.executionType.value,
                job.executionExecutedAt.value,
                job.executionMonitoringStartAt.value,
                job.executionMonitoringEndAt.value,
                job.cancelled?.value,
                job.completed?.value,
                job.error?.value,
                job.createdAt?.value,
                job.updatedAt?.value,
                job.deletedAt?.value,
                
            )
        );
    }

    updated(job: BplusItSappiJob): void
    {
        this.apply(
            new UpdatedJobEvent(
                job.id.value,
                job.tenantId?.value,
                job.systemId?.value,
                job.systemName?.value,
                job.executionId?.value,
                job.executionType?.value,
                job.executionExecutedAt?.value,
                job.executionMonitoringStartAt?.value,
                job.executionMonitoringEndAt?.value,
                job.cancelled?.value,
                job.completed?.value,
                job.error?.value,
                job.createdAt?.value,
                job.updatedAt?.value,
                job.deletedAt?.value,
                
            )
        );
    }

    deleted(job: BplusItSappiJob): void
    {
        this.apply(
            new DeletedJobEvent(
                job.id.value,
                job.tenantId.value,
                job.systemId.value,
                job.systemName.value,
                job.executionId.value,
                job.executionType.value,
                job.executionExecutedAt.value,
                job.executionMonitoringStartAt.value,
                job.executionMonitoringEndAt.value,
                job.cancelled?.value,
                job.completed?.value,
                job.error?.value,
                job.createdAt?.value,
                job.updatedAt?.value,
                job.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tenantId: this.tenantId.value,
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            executionId: this.executionId.value,
            executionType: this.executionType.value,
            executionExecutedAt: this.executionExecutedAt.value,
            executionMonitoringStartAt: this.executionMonitoringStartAt.value,
            executionMonitoringEndAt: this.executionMonitoringEndAt.value,
            cancelled: this.cancelled?.value,
            completed: this.completed?.value,
            error: this.error?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
