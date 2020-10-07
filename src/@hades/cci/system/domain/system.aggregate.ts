import { AggregateRoot } from '@nestjs/cqrs';
import { 
    SystemId,
    SystemTenantId,
    SystemTenantCode,
    SystemVersion,
    SystemName,
    SystemEnvironment,
    SystemTechnology,
    SystemIsActive,
    SystemCancelledAt,
    SystemCreatedAt,
    SystemUpdatedAt,
    SystemDeletedAt
    
} from './value-objects';
import { CreatedSystemEvent } from './../application/events/created-system.event';
import { UpdatedSystemEvent } from './../application/events/updated-system.event';
import { DeletedSystemEvent } from './../application/events/deleted-system.event';
import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';



export class CciSystem extends AggregateRoot
{
    id: SystemId;
    tenantId: SystemTenantId;
    tenantCode: SystemTenantCode;
    version: SystemVersion;
    name: SystemName;
    environment: SystemEnvironment;
    technology: SystemTechnology;
    isActive: SystemIsActive;
    cancelledAt: SystemCancelledAt;
    createdAt: SystemCreatedAt;
    updatedAt: SystemUpdatedAt;
    deletedAt: SystemDeletedAt;
    
    // eager relationship
    tenant: IamTenant;
    
    
    
    constructor(id?: SystemId, tenantId?: SystemTenantId, tenantCode?: SystemTenantCode, version?: SystemVersion, name?: SystemName, environment?: SystemEnvironment, technology?: SystemTechnology, isActive?: SystemIsActive, cancelledAt?: SystemCancelledAt, createdAt?: SystemCreatedAt, updatedAt?: SystemUpdatedAt, deletedAt?: SystemDeletedAt, tenant?: IamTenant, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.version = version;
        this.name = name;
        this.environment = environment;
        this.technology = technology;
        this.isActive = isActive;
        this.cancelledAt = cancelledAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
        // eager relationship
        this.tenant = tenant;
        
        
        
    }

    static register (id: SystemId, tenantId: SystemTenantId, tenantCode: SystemTenantCode, version: SystemVersion, name: SystemName, environment: SystemEnvironment, technology: SystemTechnology, isActive: SystemIsActive, cancelledAt: SystemCancelledAt, createdAt: SystemCreatedAt, updatedAt: SystemUpdatedAt, deletedAt: SystemDeletedAt, tenant?: IamTenant, ): CciSystem
    {
        return new CciSystem(id, tenantId, tenantCode, version, name, environment, technology, isActive, cancelledAt, createdAt, updatedAt, deletedAt, tenant, );
    }

    created(system: CciSystem): void
    {
        this.apply(
            new CreatedSystemEvent(
                system.id.value,
                system.tenantId.value,
                system.tenantCode.value,
                system.version.value,
                system.name.value,
                system.environment.value,
                system.technology.value,
                system.isActive.value,
                system.cancelledAt?.value,
                system.createdAt?.value,
                system.updatedAt?.value,
                system.deletedAt?.value,
                
            )
        );
    }

    updated(system: CciSystem): void
    {
        this.apply(
            new UpdatedSystemEvent(
                system.id.value,
                system.tenantId?.value,
                system.tenantCode?.value,
                system.version?.value,
                system.name?.value,
                system.environment?.value,
                system.technology?.value,
                system.isActive?.value,
                system.cancelledAt?.value,
                system.createdAt?.value,
                system.updatedAt?.value,
                system.deletedAt?.value,
                
            )
        );
    }

    deleted(system: CciSystem): void
    {
        this.apply(
            new DeletedSystemEvent(
                system.id.value,
                system.tenantId.value,
                system.tenantCode.value,
                system.version.value,
                system.name.value,
                system.environment.value,
                system.technology.value,
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
            technology: this.technology.value,
            isActive: this.isActive.value,
            cancelledAt: this.cancelledAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
            // eager relationship
            tenant: this.tenant?.toDTO(),
            
            
            
        }
    }
}
