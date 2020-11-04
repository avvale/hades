import { AggregateRoot } from '@nestjs/cqrs';
import {
    ExecutionId,
    ExecutionTenantId,
    ExecutionTenantCode,
    ExecutionSystemId,
    ExecutionSystemName,
    ExecutionVersion,
    ExecutionType,
    ExecutionExecutedAt,
    ExecutionMonitoringStartAt,
    ExecutionMonitoringEndAt,
    ExecutionCreatedAt,
    ExecutionUpdatedAt,
    ExecutionDeletedAt,
} from './value-objects';
import { CreatedExecutionEvent } from './../application/events/created-execution.event';
import { UpdatedExecutionEvent } from './../application/events/updated-execution.event';
import { DeletedExecutionEvent } from './../application/events/deleted-execution.event';
import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';
import { CciSystem } from '@hades/cci/system/domain/system.aggregate';

export class CciExecution extends AggregateRoot
{
    id: ExecutionId;
    tenantId: ExecutionTenantId;
    tenantCode: ExecutionTenantCode;
    systemId: ExecutionSystemId;
    systemName: ExecutionSystemName;
    version: ExecutionVersion;
    type: ExecutionType;
    executedAt: ExecutionExecutedAt;
    monitoringStartAt: ExecutionMonitoringStartAt;
    monitoringEndAt: ExecutionMonitoringEndAt;
    createdAt: ExecutionCreatedAt;
    updatedAt: ExecutionUpdatedAt;
    deletedAt: ExecutionDeletedAt;

    // eager relationship
    tenant: IamTenant;
    system: CciSystem;

    constructor(id?: ExecutionId, tenantId?: ExecutionTenantId, tenantCode?: ExecutionTenantCode, systemId?: ExecutionSystemId, systemName?: ExecutionSystemName, version?: ExecutionVersion, type?: ExecutionType, executedAt?: ExecutionExecutedAt, monitoringStartAt?: ExecutionMonitoringStartAt, monitoringEndAt?: ExecutionMonitoringEndAt, createdAt?: ExecutionCreatedAt, updatedAt?: ExecutionUpdatedAt, deletedAt?: ExecutionDeletedAt, tenant?: IamTenant, system?: CciSystem, )
    {
        super();

        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.systemId = systemId;
        this.systemName = systemName;
        this.version = version;
        this.type = type;
        this.executedAt = executedAt;
        this.monitoringStartAt = monitoringStartAt;
        this.monitoringEndAt = monitoringEndAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.tenant = tenant;
        this.system = system;
    }

    static register (id: ExecutionId, tenantId: ExecutionTenantId, tenantCode: ExecutionTenantCode, systemId: ExecutionSystemId, systemName: ExecutionSystemName, version: ExecutionVersion, type: ExecutionType, executedAt: ExecutionExecutedAt, monitoringStartAt: ExecutionMonitoringStartAt, monitoringEndAt: ExecutionMonitoringEndAt, createdAt: ExecutionCreatedAt, updatedAt: ExecutionUpdatedAt, deletedAt: ExecutionDeletedAt, tenant?: IamTenant, system?: CciSystem, ): CciExecution
    {
        return new CciExecution(id, tenantId, tenantCode, systemId, systemName, version, type, executedAt, monitoringStartAt, monitoringEndAt, createdAt, updatedAt, deletedAt, tenant, system, );
    }

    created(execution: CciExecution): void
    {
        this.apply(
            new CreatedExecutionEvent(
                execution.id.value,
                execution.tenantId.value,
                execution.tenantCode.value,
                execution.systemId.value,
                execution.systemName.value,
                execution.version.value,
                execution.type.value,
                execution.executedAt.value,
                execution.monitoringStartAt.value,
                execution.monitoringEndAt.value,
                execution.createdAt?.value,
                execution.updatedAt?.value,
                execution.deletedAt?.value,
                
            )
        );
    }

    updated(execution: CciExecution): void
    {
        this.apply(
            new UpdatedExecutionEvent(
                execution.id.value,
                execution.tenantId?.value,
                execution.tenantCode?.value,
                execution.systemId?.value,
                execution.systemName?.value,
                execution.version?.value,
                execution.type?.value,
                execution.executedAt?.value,
                execution.monitoringStartAt?.value,
                execution.monitoringEndAt?.value,
                execution.createdAt?.value,
                execution.updatedAt?.value,
                execution.deletedAt?.value,
                
            )
        );
    }

    deleted(execution: CciExecution): void
    {
        this.apply(
            new DeletedExecutionEvent(
                execution.id.value,
                execution.tenantId.value,
                execution.tenantCode.value,
                execution.systemId.value,
                execution.systemName.value,
                execution.version.value,
                execution.type.value,
                execution.executedAt.value,
                execution.monitoringStartAt.value,
                execution.monitoringEndAt.value,
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
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            version: this.version.value,
            type: this.type.value,
            executedAt: this.executedAt.value,
            monitoringStartAt: this.monitoringStartAt.value,
            monitoringEndAt: this.monitoringEndAt.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
            // eager relationship
            
            
            tenant: this.tenant?.toDTO(),
            system: this.system?.toDTO(),
            
            
            
        }
    }
}
