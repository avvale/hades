import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { IamTenant } from './tenant.aggregate';
import { TenantResponse } from './tenant.response';
import { 
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantData,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt
    
} from './value-objects';



import { AccountMapper } from '@hades/iam/account/domain/account.mapper';

export class TenantMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param tenant
     */
    mapModelToAggregate(tenant: ObjectLiteral): IamTenant
    {
        if (!tenant) return;

        return this.makeAggregate(tenant);
    }

    /**
     * Map array of objects to array aggregates
     * @param tenants 
     */
    mapModelsToAggregates(tenants: ObjectLiteral[]): IamTenant[]
    {
        if (!Array.isArray(tenants)) return;
        
        return tenants.map(tenant  => this.makeAggregate(tenant));
    }

    /**
     * Map aggregate to response
     * @param tenant 
     */
    mapAggregateToResponse(tenant: IamTenant): TenantResponse
    {
        return this.makeResponse(tenant);
    }

    /**
     * Map array of aggregates to array responses
     * @param tenants
     */
    mapAggregatesToResponses(tenants: IamTenant[]): TenantResponse[]
    {
        if (!Array.isArray(tenants)) return;

        return tenants.map(tenant => this.makeResponse(tenant));
    }

    private makeAggregate(tenant: ObjectLiteral): IamTenant
    {
        return IamTenant.register(
            new TenantId(tenant.id),
            new TenantName(tenant.name),
            new TenantCode(tenant.code),
            new TenantLogo(tenant.logo),
            new TenantIsActive(tenant.isActive),
            new TenantData(tenant.data),
            new TenantAccountIds(tenant.accountIds),
            new TenantCreatedAt(tenant.createdAt),
            new TenantUpdatedAt(tenant.updatedAt),
            new TenantDeletedAt(tenant.deletedAt),
            
            
            
            
            
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: false }).mapModelsToAggregates(tenant.accounts) : undefined,
            
        );
    }

    private makeResponse(tenant: IamTenant): TenantResponse
    {
        if (!tenant) return;
        
        return new TenantResponse(
            tenant.id.value,
            tenant.name.value,
            tenant.code.value,
            tenant.logo.value,
            tenant.isActive.value,
            tenant.data.value,
            tenant.accountIds.value,
            tenant.createdAt.value,
            tenant.updatedAt.value,
            tenant.deletedAt.value,
            
            
            
            
            
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: false }).mapAggregatesToResponses(tenant.accounts) : undefined,
            
        );
    }
}