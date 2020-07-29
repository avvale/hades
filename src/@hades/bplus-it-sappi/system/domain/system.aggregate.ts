import { AggregateRoot } from '@nestjs/cqrs';
import { 
    SystemId, 
    SystemTenantId, 
    SystemTenantCode, 
    SystemVersion, 
    SystemName, 
    SystemEnvironment, 
    SystemIsActive, 
    SystemCancelledAt, 
    SystemCreatedAt, 
    SystemUpdatedAt, 
    SystemDeletedAt
    
} from './value-objects';
import { CreatedSystemEvent } from './../application/events/created-system.event';
import { UpdatedSystemEvent } from './../application/events/updated-system.event';
import { DeletedSystemEvent } from './../application/events/deleted-system.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';

export class BplusItSappiSystem extends AggregateRoot
{
    id: SystemId;
    tenantId: SystemTenantId;
    tenantCode: SystemTenantCode;
    version: SystemVersion;
    name: SystemName;
    environment: SystemEnvironment;
    isActive: SystemIsActive;
    cancelledAt: SystemCancelledAt;
    createdAt: SystemCreatedAt;
    updatedAt: SystemUpdatedAt;
    deletedAt: SystemDeletedAt;
    
    constructor(id?: SystemId, tenantId?: SystemTenantId, tenantCode?: SystemTenantCode, version?: SystemVersion, name?: SystemName, environment?: SystemEnvironment, isActive?: SystemIsActive, cancelledAt?: SystemCancelledAt, createdAt?: SystemCreatedAt, updatedAt?: SystemUpdatedAt, deletedAt?: SystemDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.version = version;
        this.name = name;
        this.environment = environment;
        this.isActive = isActive;
        this.cancelledAt = cancelledAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: SystemId, tenantId: SystemTenantId, tenantCode: SystemTenantCode, version: SystemVersion, name: SystemName, environment: SystemEnvironment, isActive: SystemIsActive, cancelledAt: SystemCancelledAt, createdAt: SystemCreatedAt, updatedAt: SystemUpdatedAt, deletedAt: SystemDeletedAt, ): BplusItSappiSystem
    {
        return new BplusItSappiSystem(id, tenantId, tenantCode, version, name, environment, isActive, cancelledAt, createdAt, updatedAt, deletedAt, );
    }

    created(system: BplusItSappiSystem): void
    {
        this.apply(
            new CreatedSystemEvent(
                system.id.value,
                system.tenantId.value,
                system.tenantCode.value,
                system.version.value,
                system.name.value,
                system.environment.value,
                system.isActive.value,
                system.cancelledAt?.value,
                system.createdAt?.value,
                system.updatedAt?.value,
                system.deletedAt?.value,
                
            )
        );
    }

    updated(system: BplusItSappiSystem): void
    {
        this.apply(
            new UpdatedSystemEvent(
                system.id.value,
                system.tenantId?.value,
                system.tenantCode?.value,
                system.version?.value,
                system.name?.value,
                system.environment?.value,
                system.isActive?.value,
                system.cancelledAt?.value,
                system.createdAt?.value,
                system.updatedAt?.value,
                system.deletedAt?.value,
                
            )
        );
    }

    deleted(system: BplusItSappiSystem): void
    {
        this.apply(
            new DeletedSystemEvent(
                system.id.value,
                system.tenantId.value,
                system.tenantCode.value,
                system.version.value,
                system.name.value,
                system.environment.value,
                system.isActive.value,
                system.cancelledAt?.value,
                system.createdAt?.value,
                system.updatedAt?.value,
                system.deletedAt?.value,
                
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
            name: this.name.value,
            environment: this.environment.value,
            isActive: this.isActive.value,
            cancelledAt: this.cancelledAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
