import { AggregateRoot } from '@nestjs/cqrs';
import { 
    RoleId,
    RoleTenantId,
    RoleTenantCode,
    RoleName,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt
    
} from './value-objects';
import { CreatedRoleEvent } from './../application/events/created-role.event';
import { UpdatedRoleEvent } from './../application/events/updated-role.event';
import { DeletedRoleEvent } from './../application/events/deleted-role.event';
import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';



export class CciRole extends AggregateRoot
{
    id: RoleId;
    tenantId: RoleTenantId;
    tenantCode: RoleTenantCode;
    name: RoleName;
    createdAt: RoleCreatedAt;
    updatedAt: RoleUpdatedAt;
    deletedAt: RoleDeletedAt;
    
    // eager relationship
    tenant: IamTenant;
    
    
    
    constructor(id?: RoleId, tenantId?: RoleTenantId, tenantCode?: RoleTenantCode, name?: RoleName, createdAt?: RoleCreatedAt, updatedAt?: RoleUpdatedAt, deletedAt?: RoleDeletedAt, tenant?: IamTenant, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
        // eager relationship
        this.tenant = tenant;
        
        
        
    }

    static register (id: RoleId, tenantId: RoleTenantId, tenantCode: RoleTenantCode, name: RoleName, createdAt: RoleCreatedAt, updatedAt: RoleUpdatedAt, deletedAt: RoleDeletedAt, tenant?: IamTenant, ): CciRole
    {
        return new CciRole(id, tenantId, tenantCode, name, createdAt, updatedAt, deletedAt, tenant, );
    }

    created(role: CciRole): void
    {
        this.apply(
            new CreatedRoleEvent(
                role.id.value,
                role.tenantId.value,
                role.tenantCode.value,
                role.name.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
                
            )
        );
    }

    updated(role: CciRole): void
    {
        this.apply(
            new UpdatedRoleEvent(
                role.id.value,
                role.tenantId?.value,
                role.tenantCode?.value,
                role.name?.value,
                role.createdAt?.value,
                role.updatedAt?.value,
                role.deletedAt?.value,
                
            )
        );
    }

    deleted(role: CciRole): void
    {
        this.apply(
            new DeletedRoleEvent(
                role.id.value,
                role.tenantId.value,
                role.tenantCode.value,
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
            tenantCode: this.tenantCode.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
            // eager relationship
            tenant: this.tenant?.toDTO(),
            
            
            
        }
    }
}
