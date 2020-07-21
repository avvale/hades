import { AggregateRoot } from '@nestjs/cqrs';
import { 
    TenantId, 
    TenantName, 
    TenantCode, 
    TenantLogo, 
    TenantIsActive, 
    TenantData, 
    TenantCreatedAt, 
    TenantUpdatedAt, 
    TenantDeletedAt
    
} from './value-objects';
import { CreatedTenantEvent } from './../application/events/created-tenant.event';
import { UpdatedTenantEvent } from './../application/events/updated-tenant.event';
import { DeletedTenantEvent } from './../application/events/deleted-tenant.event';

export class AdminTenant extends AggregateRoot
{
    id: TenantId;
    name: TenantName;
    code: TenantCode;
    logo: TenantLogo;
    isActive: TenantIsActive;
    data: TenantData;
    createdAt: TenantCreatedAt;
    updatedAt: TenantUpdatedAt;
    deletedAt: TenantDeletedAt;
    
    constructor(id?: TenantId, name?: TenantName, code?: TenantCode, logo?: TenantLogo, isActive?: TenantIsActive, data?: TenantData, createdAt?: TenantCreatedAt, updatedAt?: TenantUpdatedAt, deletedAt?: TenantDeletedAt, )
    {
        super();
        
        this.id = id;
        this.name = name;
        this.code = code;
        this.logo = logo;
        this.isActive = isActive;
        this.data = data;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: TenantId, name: TenantName, code: TenantCode, logo: TenantLogo, isActive: TenantIsActive, data: TenantData, createdAt: TenantCreatedAt, updatedAt: TenantUpdatedAt, deletedAt: TenantDeletedAt, ): AdminTenant
    {
        return new AdminTenant(id, name, code, logo, isActive, data, createdAt, updatedAt, deletedAt, );
    }

    created(tenant: AdminTenant): void
    {
        this.apply(
            new CreatedTenantEvent(
                tenant.id.value,
                tenant.name.value,
                tenant.code.value,
                tenant.logo?.value,
                tenant.isActive.value,
                tenant.data?.value,
                tenant.createdAt?.value,
                tenant.updatedAt?.value,
                tenant.deletedAt?.value,
                
            )
        );
    }

    updated(tenant: AdminTenant): void
    {
        this.apply(
            new UpdatedTenantEvent(
                tenant.id.value,
                tenant.name?.value,
                tenant.code?.value,
                tenant.logo?.value,
                tenant.isActive?.value,
                tenant.data?.value,
                tenant.createdAt?.value,
                tenant.updatedAt?.value,
                tenant.deletedAt?.value,
                
            )
        );
    }

    deleted(tenant: AdminTenant): void
    {
        this.apply(
            new DeletedTenantEvent(
                tenant.id.value,
                tenant.name.value,
                tenant.code.value,
                tenant.logo?.value,
                tenant.isActive.value,
                tenant.data?.value,
                tenant.createdAt?.value,
                tenant.updatedAt?.value,
                tenant.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            name: this.name.value,
            code: this.code.value,
            logo: this.logo?.value,
            isActive: this.isActive.value,
            data: this.data?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
