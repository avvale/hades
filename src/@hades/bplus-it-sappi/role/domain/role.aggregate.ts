import { AggregateRoot } from '@nestjs/cqrs';
import { 
    RoleId, 
    RoleTenantId, 
    RoleName, 
    RoleCreatedAt, 
    RoleUpdatedAt, 
    RoleDeletedAt
    
} from './value-objects';
import { CreatedRoleEvent } from './../application/events/created-role.event';
import { UpdatedRoleEvent } from './../application/events/updated-role.event';
import { DeletedRoleEvent } from './../application/events/deleted-role.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';

export class BplusItSappiRole extends AggregateRoot
{
    id: RoleId;
    tenantId: RoleTenantId;
    tenant: AdminTenant;
    name: RoleName;
    createdAt: RoleCreatedAt;
    updatedAt: RoleUpdatedAt;
    deletedAt: RoleDeletedAt;
    
    constructor(id?: RoleId, tenantId?: RoleTenantId, name?: RoleName, createdAt?: RoleCreatedAt, updatedAt?: RoleUpdatedAt, deletedAt?: RoleDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: RoleId, tenantId: RoleTenantId, name: RoleName, createdAt: RoleCreatedAt, updatedAt: RoleUpdatedAt, deletedAt: RoleDeletedAt, ): BplusItSappiRole
    {
        return new BplusItSappiRole(id, tenantId, name, createdAt, updatedAt, deletedAt, );
    }

    created(role: BplusItSappiRole): void
    {
        this.apply(
            new CreatedRoleEvent(
                role.id.value,
                role.tenantId.value,
                role.name.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
                
            )
        );
    }

    updated(role: BplusItSappiRole): void
    {
        this.apply(
            new UpdatedRoleEvent(
                role.id.value,
                role.tenantId?.value,
                role.name?.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
                
            )
        );
    }

    deleted(role: BplusItSappiRole): void
    {
        this.apply(
            new DeletedRoleEvent(
                role.id.value,
                role.tenantId.value,
                role.name.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tenantId: this.tenantId.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
