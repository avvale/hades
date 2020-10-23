import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { IamRole } from './role.aggregate';
import { RoleResponse } from './role.response';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt
    
} from './value-objects';



import { PermissionMapper } from '@hades/iam/permission/domain/permission.mapper';
import { AccountMapper } from '@hades/iam/account/domain/account.mapper';

export class RoleMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}

    /**
     * Map object to aggregate
     * @param role
     */
    mapModelToAggregate(role: ObjectLiteral): IamRole
    {
        if (!role) return;

        return this.makeAggregate(role);
    }

    /**
     * Map array of objects to array aggregates
     * @param roles 
     */
    mapModelsToAggregates(roles: ObjectLiteral[]): IamRole[]
    {
        if (!Array.isArray(roles)) return;

        return roles.map(role  => this.makeAggregate(role));
    }

    /**
     * Map aggregate to response
     * @param role
     */
    mapAggregateToResponse(role: IamRole): RoleResponse
    {
        return this.makeResponse(role);
    }

    /**
     * Map array of aggregates to array responses
     * @param roles
     */
    mapAggregatesToResponses(roles: IamRole[]): RoleResponse[]
    {
        if (!Array.isArray(roles)) return;

        return roles.map(role => this.makeResponse(role));
    }

    private makeAggregate(role: ObjectLiteral): IamRole
    {
        return IamRole.register(
            new RoleId(role.id),
            new RoleName(role.name),
            new RoleIsMaster(role.isMaster),
            new RolePermissionIds(role.permissionIds),
            new RoleAccountIds(role.accountIds),
            new RoleCreatedAt(role.createdAt),
            new RoleUpdatedAt(role.updatedAt),
            new RoleDeletedAt(role.deletedAt),
            
            
            
            
            
            this.options.eagerLoading ? new PermissionMapper({ eagerLoading: false }).mapModelsToAggregates(role.permissions) : undefined,
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: false }).mapModelsToAggregates(role.accounts) : undefined,
            
        );
    }

    private makeResponse(role: IamRole): RoleResponse
    {
        if (!role) return;

        return new RoleResponse(
            role.id.value,
            role.name.value,
            role.isMaster.value,
            role.permissionIds.value,
            role.accountIds.value,
            role.createdAt.value,
            role.updatedAt.value,
            role.deletedAt.value,
            
            
            
            
            
            this.options.eagerLoading ? new PermissionMapper({ eagerLoading: false }).mapAggregatesToResponses(role.permissions) : undefined,
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: false }).mapAggregatesToResponses(role.accounts) : undefined,
            
        );
    }
}