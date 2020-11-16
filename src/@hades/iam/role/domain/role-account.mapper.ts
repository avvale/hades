import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { IamRoleAccount } from './role-account.aggregate';
import { 
    RoleRoleId,
    RoleAccountId
    
} from './value-objects';

export class RoleAccountMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param roleAccount
     */
    mapModelToAggregate(roleAccount: ObjectLiteral): IamRoleAccount
    {
        if (!roleAccount) return;

        return this.makeAggregate(roleAccount);
    }

    /**
     * Map array of objects to array aggregates
     * @param rolesAccounts 
     */
    mapModelsToAggregates(rolesAccounts: ObjectLiteral[]): IamRoleAccount[]
    {
        if (!Array.isArray(rolesAccounts)) return;
        
        return rolesAccounts.map(roleAccount  => this.makeAggregate(roleAccount));
    }

    mapAggregateToResponse(roleAccount: IamRoleAccount): ObjectLiteral
    {
        return null;
    }

    mapAggregatesToResponses(roleAccount: IamRoleAccount[]): ObjectLiteral[]
    {
        return null;
    }

    private makeAggregate(roleAccount: ObjectLiteral): IamRoleAccount
    {
        return IamRoleAccount.register(
            new RoleRoleId(roleAccount.roleId),
            new RoleAccountId(roleAccount.accountId),
        );
    }
}