import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionSystemId, 
    ExecutionType, 
    ExecutionMonitoringStartAt, 
    ExecutionMonitoringEndAt, 
    ExecutionExecutedAt, 
    ExecutionCreatedAt, 
    ExecutionUpdatedAt, 
    ExecutionDeletedAt
    
} from './value-objects';
import { CreatedExecutionEvent } from './../application/events/created-execution.event';
import { UpdatedExecutionEvent } from './../application/events/updated-execution.event';
import { DeletedExecutionEvent } from './../application/events/deleted-execution.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.entity';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.entity';

export class BplusItSappiExecution extends AggregateRoot
{
    id: ExecutionId;
    tenantId: ExecutionTenantId;
    tenant: AdminTenant;
    systemId: ExecutionSystemId;
    system: BplusItSappiSystem;
    type: ExecutionType;
    monitoringStartAt: ExecutionMonitoringStartAt;
    monitoringEndAt: ExecutionMonitoringEndAt;
    executedAt: ExecutionExecutedAt;
    createdAt: ExecutionCreatedAt;
    updatedAt: ExecutionUpdatedAt;
    deletedAt: ExecutionDeletedAt;
    
    constructor(id?: ExecutionId, tenantId?: ExecutionTenantId, systemId?: ExecutionSystemId, type?: ExecutionType, monitoringStartAt?: ExecutionMonitoringStartAt, monitoringEndAt?: ExecutionMonitoringEndAt, executedAt?: ExecutionExecutedAt, createdAt?: ExecutionCreatedAt, updatedAt?: ExecutionUpdatedAt, deletedAt?: ExecutionDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.systemId = systemId;
        this.type = type;
        this.monitoringStartAt = monitoringStartAt;
        this.monitoringEndAt = monitoringEndAt;
        this.executedAt = executedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: ExecutionId,tenantId: ExecutionTenantId,systemId: ExecutionSystemId,type: ExecutionType,monitoringStartAt: ExecutionMonitoringStartAt,monitoringEndAt: ExecutionMonitoringEndAt,executedAt: ExecutionExecutedAt,createdAt: ExecutionCreatedAt,updatedAt: ExecutionUpdatedAt,deletedAt: ExecutionDeletedAt,): BplusItSappiExecution
    {
        return new BplusItSappiExecution(id, tenantId, systemId, type, monitoringStartAt, monitoringEndAt, executedAt, createdAt, updatedAt, deletedAt, );
    }

    created(execution: BplusItSappiExecution): void
    {
        this.apply(
            new CreatedExecutionEvent(
                execution.id.value,
                execution.tenantId.value,
                execution.systemId.value,
                execution.type.value,
                execution.monitoringStartAt.value,
                execution.monitoringEndAt.value,
                execution.executedAt.value,
                execution.createdAt?.value,
                execution.updatedAt?.value,
                execution.deletedAt?.value,
                
            )
        );
    }

    updated(execution: BplusItSappiExecution): void
    {
        this.apply(
            new UpdatedExecutionEvent(
                execution.id.value,
                execution.tenantId?.value,
                execution.systemId?.value,
                execution.type?.value,
                execution.monitoringStartAt?.value,
                execution.monitoringEndAt?.value,
                execution.executedAt?.value,
                execution.createdAt?.value,
                execution.updatedAt?.value,
                execution.deletedAt?.value,
                
            )
        );
    }

    deleted(execution: BplusItSappiExecution): void
    {
        this.apply(
            new DeletedExecutionEvent(
                execution.id.value,
                execution.tenantId.value,
                execution.systemId.value,
                execution.type.value,
                execution.monitoringStartAt.value,
                execution.monitoringEndAt.value,
                execution.executedAt.value,
                execution.createdAt?.value,
                execution.updatedAt?.value,
                execution.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tenantId: this.tenantId.value,
            systemId: this.systemId.value,
            type: this.type.value,
            monitoringStartAt: this.monitoringStartAt.value,
            monitoringEndAt: this.monitoringEndAt.value,
            executedAt: this.executedAt.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
