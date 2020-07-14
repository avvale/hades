import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminTenant } from './tenant.aggregate';
import { TenantResponse } from './tenant.response';
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

export class TenantMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param tenant
     */
    mapObjectToAggregate(tenant: ObjectLiteral): AdminTenant
    {
        return this.makeAggregate(tenant);
    }

    /**
     * Map array of objects to array aggregates
     * @param tenants 
     */
    mapObjectsToAggregates(tenants: ObjectLiteral[]): AdminTenant[]
    {
        return tenants.map(tenant  => this.makeAggregate(tenant ));
    }

    /**
     * Map aggregate to response
     * @param tenant 
     */
    mapAggregateToResponse(tenant: AdminTenant): TenantResponse
    {
        return this.makeResponse(tenant);
    }

    /**
     * Map array of aggregates to array responses
     * @param tenants
     */
    mapAggregatesToResponses(tenants: AdminTenant[]): TenantResponse[]
    {
        return tenants.map(tenant => this.makeResponse(tenant));
    }

    private makeAggregate(tenant: ObjectLiteral): AdminTenant
    {
        return AdminTenant.register(
            new TenantId(tenant.id),
            new TenantName(tenant.name),
            new TenantCode(tenant.code),
            new TenantLogo(tenant.logo),
            new TenantIsActive(tenant.isActive),
            new TenantData(tenant.data),
            new TenantCreatedAt(tenant.createdAt),
            new TenantUpdatedAt(tenant.updatedAt),
            new TenantDeletedAt(tenant.deletedAt),
              
        );
    }

    private makeResponse(tenant: AdminTenant): TenantResponse
    {
        return new TenantResponse(
            tenant.id.value,
            tenant.name.value,
            tenant.code.value,
            tenant.logo.value,
            tenant.isActive.value,
            tenant.data.value,
            tenant.createdAt.value,
            tenant.updatedAt.value,
            tenant.deletedAt.value,
            
        );
    }
}