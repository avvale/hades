import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionTenantCode, 
    ExecutionVersion, 
    ExecutionSystemId, 
    ExecutionSystemName, 
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
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.aggregate';

export class BplusItSappiExecution extends AggregateRoot
{
    id: ExecutionId;
    tenantId: ExecutionTenantId;
    tenant: AdminTenant;
    tenantCode: ExecutionTenantCode;
    version: ExecutionVersion;
    systemId: ExecutionSystemId;
    system: BplusItSappiSystem;
    systemName: ExecutionSystemName;
    type: ExecutionType;
    monitoringStartAt: ExecutionMonitoringStartAt;
    monitoringEndAt: ExecutionMonitoringEndAt;
    executedAt: ExecutionExecutedAt;
    createdAt: ExecutionCreatedAt;
    updatedAt: ExecutionUpdatedAt;
    deletedAt: ExecutionDeletedAt;
    
    constructor(id?: ExecutionId, tenantId?: ExecutionTenantId, tenantCode?: ExecutionTenantCode, version?: ExecutionVersion, systemId?: ExecutionSystemId, systemName?: ExecutionSystemName, type?: ExecutionType, monitoringStartAt?: ExecutionMonitoringStartAt, monitoringEndAt?: ExecutionMonitoringEndAt, executedAt?: ExecutionExecutedAt, createdAt?: ExecutionCreatedAt, updatedAt?: ExecutionUpdatedAt, deletedAt?: ExecutionDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.version = version;
        this.systemId = systemId;
        this.systemName = systemName;
        this.type = type;
        this.monitoringStartAt = monitoringStartAt;
        this.monitoringEndAt = monitoringEndAt;
        this.executedAt = executedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: ExecutionId, tenantId: ExecutionTenantId, tenantCode: ExecutionTenantCode, version: ExecutionVersion, systemId: ExecutionSystemId, systemName: ExecutionSystemName, type: ExecutionType, monitoringStartAt: ExecutionMonitoringStartAt, monitoringEndAt: ExecutionMonitoringEndAt, executedAt: ExecutionExecutedAt, createdAt: ExecutionCreatedAt, updatedAt: ExecutionUpdatedAt, deletedAt: ExecutionDeletedAt, ): BplusItSappiExecution
    {
        return new BplusItSappiExecution(id, tenantId, tenantCode, version, systemId, systemName, type, monitoringStartAt, monitoringEndAt, executedAt, createdAt, updatedAt, deletedAt, );
    }

    created(execution: BplusItSappiExecution): void
    {
        this.apply(
            new CreatedExecutionEvent(
                execution.id.value,
                execution.tenantId.value,
                execution.tenantCode.value,
                execution.version.value,
                execution.systemId.value,
                execution.systemName.value,
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
                execution.tenantCode?.value,
                execution.version?.value,
                execution.systemId?.value,
                execution.systemName?.value,
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
                execution.tenantCode.value,
                execution.version.value,
                execution.systemId.value,
                execution.systemName.value,
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
            tenantCode: this.tenantCode.value,
            version: this.version.value,
            systemId: this.systemId.value,
            systemName: this.systemName.value,
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
