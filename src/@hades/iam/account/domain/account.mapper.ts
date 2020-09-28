import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { IamAccount } from './account.aggregate';
import { AccountResponse } from './account.response';
import { 
    AccountId,
    AccountType,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountApplicationCodes,
    AccountPermissions,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt
    
} from './value-objects';
import { UserMapper } from '@hades/iam/user/domain/user.mapper';



import { RoleMapper } from '@hades/iam/role/domain/role.mapper';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';

export class AccountMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param account
     */
    mapModelToAggregate(account: ObjectLiteral): IamAccount
    {
        if (!account) return;

        return this.makeAggregate(account);
    }

    /**
     * Map array of objects to array aggregates
     * @param accounts 
     */
    mapModelsToAggregates(accounts: ObjectLiteral[]): IamAccount[]
    {
        if (!Array.isArray(accounts)) return;
        
        return accounts.map(account  => this.makeAggregate(account));
    }

    /**
     * Map aggregate to response
     * @param account 
     */
    mapAggregateToResponse(account: IamAccount): AccountResponse
    {
        return this.makeResponse(account);
    }

    /**
     * Map array of aggregates to array responses
     * @param accounts
     */
    mapAggregatesToResponses(accounts: IamAccount[]): AccountResponse[]
    {
        if (!Array.isArray(accounts)) return;

        return accounts.map(account => this.makeResponse(account));
    }

    private makeAggregate(account: ObjectLiteral): IamAccount
    {
        return IamAccount.register(
            new AccountId(account.id),
            new AccountType(account.type),
            new AccountEmail(account.email),
            new AccountIsActive(account.isActive),
            new AccountClientId(account.clientId),
            new AccountApplicationCodes(account.applicationCodes),
            new AccountPermissions(account.permissions),
            new AccountData(account.data),
            new AccountRoleIds(account.roleIds),
            new AccountTenantIds(account.tenantIds),
            new AccountCreatedAt(account.createdAt),
            new AccountUpdatedAt(account.updatedAt),
            new AccountDeletedAt(account.deletedAt),
            
            
            this.options.eagerLoading ? new UserMapper({ eagerLoading: false }).mapModelToAggregate(account.user) : undefined,
            
            
            
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: false }).mapModelsToAggregates(account.roles) : undefined,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelsToAggregates(account.tenants) : undefined,
            
        );
    }

    private makeResponse(account: IamAccount): AccountResponse
    {
        if (!account) return;
        
        return new AccountResponse(
            account.id.value,
            account.type.value,
            account.email.value,
            account.isActive.value,
            account.clientId.value,
            account.applicationCodes.value,
            account.permissions.value,
            account.data.value,
            account.roleIds.value,
            account.tenantIds.value,
            account.createdAt.value,
            account.updatedAt.value,
            account.deletedAt.value,
            
            
            this.options.eagerLoading ? new UserMapper({ eagerLoading: false }).mapAggregateToResponse(account.user) : undefined,
            
            
            
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: false }).mapAggregatesToResponses(account.roles) : undefined,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregatesToResponses(account.tenants) : undefined,
            
        );
    }
}