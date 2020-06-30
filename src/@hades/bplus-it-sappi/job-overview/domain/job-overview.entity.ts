import { AggregateRoot } from '@nestjs/cqrs';
import { 
    JobOverviewId, 
    JobOverviewTenantId, 
    JobOverviewSystemId, 
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
    
} from './value-objects';
import { CreatedJobOverviewEvent } from './../application/events/created-job-overview.event';
import { UpdatedJobOverviewEvent } from './../application/events/updated-job-overview.event';
import { DeletedJobOverviewEvent } from './../application/events/deleted-job-overview.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.entity';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.entity';

export class BplusItSappiJobOverview extends AggregateRoot
{
    id: JobOverviewId;
    tenantId: JobOverviewTenantId;
    tenant: AdminTenant;
    systemId: JobOverviewSystemId;
    system: BplusItSappiSystem;
    executionType: JobOverviewExecutionType;
    executionExecutedAt: JobOverviewExecutionExecutedAt;
    executionMonitoringStartAt: JobOverviewExecutionMonitoringStartAt;
    executionMonitoringEndAt: JobOverviewExecutionMonitoringEndAt;
    cancelled: JobOverviewCancelled;
    completed: JobOverviewCompleted;
    error: JobOverviewError;
    createdAt: JobOverviewCreatedAt;
    updatedAt: JobOverviewUpdatedAt;
    deletedAt: JobOverviewDeletedAt;
    
    constructor(id?: JobOverviewId, tenantId?: JobOverviewTenantId, systemId?: JobOverviewSystemId, executionType?: JobOverviewExecutionType, executionExecutedAt?: JobOverviewExecutionExecutedAt, executionMonitoringStartAt?: JobOverviewExecutionMonitoringStartAt, executionMonitoringEndAt?: JobOverviewExecutionMonitoringEndAt, cancelled?: JobOverviewCancelled, completed?: JobOverviewCompleted, error?: JobOverviewError, createdAt?: JobOverviewCreatedAt, updatedAt?: JobOverviewUpdatedAt, deletedAt?: JobOverviewDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.systemId = systemId;
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

    static register (id: JobOverviewId,tenantId: JobOverviewTenantId,systemId: JobOverviewSystemId,executionType: JobOverviewExecutionType,executionExecutedAt: JobOverviewExecutionExecutedAt,executionMonitoringStartAt: JobOverviewExecutionMonitoringStartAt,executionMonitoringEndAt: JobOverviewExecutionMonitoringEndAt,cancelled: JobOverviewCancelled,completed: JobOverviewCompleted,error: JobOverviewError,createdAt: JobOverviewCreatedAt,updatedAt: JobOverviewUpdatedAt,deletedAt: JobOverviewDeletedAt,): BplusItSappiJobOverview
    {
        return new BplusItSappiJobOverview(id, tenantId, systemId, executionType, executionExecutedAt, executionMonitoringStartAt, executionMonitoringEndAt, cancelled, completed, error, createdAt, updatedAt, deletedAt, );
    }

    created(jobOverview: BplusItSappiJobOverview): void
    {
        this.apply(
            new CreatedJobOverviewEvent(
                jobOverview.id.value,
                jobOverview.tenantId.value,
                jobOverview.systemId.value,
                jobOverview.executionType.value,
                jobOverview.executionExecutedAt.value,
                jobOverview.executionMonitoringStartAt.value,
                jobOverview.executionMonitoringEndAt.value,
                jobOverview.cancelled?.value,
                jobOverview.completed?.value,
                jobOverview.error?.value,
                jobOverview.createdAt?.value,
                jobOverview.updatedAt?.value,
                jobOverview.deletedAt?.value,
                
            )
        );
    }

    updated(jobOverview: BplusItSappiJobOverview): void
    {
        this.apply(
            new UpdatedJobOverviewEvent(
                jobOverview.id.value,
                jobOverview.tenantId?.value,
                jobOverview.systemId?.value,
                jobOverview.executionType?.value,
                jobOverview.executionExecutedAt?.value,
                jobOverview.executionMonitoringStartAt?.value,
                jobOverview.executionMonitoringEndAt?.value,
                jobOverview.cancelled?.value,
                jobOverview.completed?.value,
                jobOverview.error?.value,
                jobOverview.createdAt?.value,
                jobOverview.updatedAt?.value,
                jobOverview.deletedAt?.value,
                
            )
        );
    }

    deleted(jobOverview: BplusItSappiJobOverview): void
    {
        this.apply(
            new DeletedJobOverviewEvent(
                jobOverview.id.value,
                jobOverview.tenantId.value,
                jobOverview.systemId.value,
                jobOverview.executionType.value,
                jobOverview.executionExecutedAt.value,
                jobOverview.executionMonitoringStartAt.value,
                jobOverview.executionMonitoringEndAt.value,
                jobOverview.cancelled?.value,
                jobOverview.completed?.value,
                jobOverview.error?.value,
                jobOverview.createdAt?.value,
                jobOverview.updatedAt?.value,
                jobOverview.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tenantId: this.tenantId.value,
            systemId: this.systemId.value,
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
