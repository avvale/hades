import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';
import { CreatePermissionsCommand } from '@hades/iam/permission/application/create/create-permissions.command';
import { CreatePermissionsRolesCommand } from '@hades/iam/permission/application/create/create-permissions-roles.command';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { AccountPermissions } from '@hades/iam/account/domain/lib/account.types';
import { SeederBoundedContext, SeederPermission } from '@hades/shared/domain/lib/hades.types';

export class IamUtils
{
    static administratorAccountId: string = '948a5308-a49d-42dc-9ea3-7490e120000b';
    static administratorRoleId: string = '99b06044-fff5-4267-9314-4bae9f909010';

    static async iamCommonSeed(
        commandBus: ICommandBus, 
        queryBus: IQueryBus,
        boundedContexts: SeederBoundedContext[],
        permissions: SeederPermission[]
    )
    {
        const adminstratorAccount = await queryBus.ask(new FindAccountByIdQuery(IamUtils.administratorAccountId));
        await commandBus.dispatch(new CreateBoundedContextsCommand(boundedContexts));
        await commandBus.dispatch(new CreatePermissionsCommand(permissions));

        // set all permissions to administration role
        const permissionsRoles = permissions.map(permission => {
            return {
                permissionId: permission.id,
                roleId: IamUtils.administratorRoleId
            }
        });
        await commandBus.dispatch(new CreatePermissionsRolesCommand(permissionsRoles));

        const accountPermissions = IamUtils.updateAccountPermissions(
            IamUtils.administratorRoleId,
            permissions,
            adminstratorAccount
        );

        // set all permissions to administration account
        await commandBus.dispatch(new UpdateAccountCommand(
            IamUtils.administratorAccountId,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            accountPermissions
        ));
    }

    static updateAccountPermissions(roleId: string, newPermissions: SeederPermission[], account: AccountResponse): AccountPermissions
    {
        // set new permissions from current role for each account
        account.dPermissions[roleId] = newPermissions.map(permission => permission.name);
            
        // container for all permissions
        const allPermissions = [];

        // iterate each role from account
        for (const index in account.dPermissions)
        {
            // avoid iterate all index, is the key that contain all permissions 
            if (index !== 'all')
            {
                for (const permission of account.dPermissions[index])
                {
                    if (allPermissions.indexOf(permission) === -1) allPermissions.push(permission);
                }
            }
        }
        // set all permissions
        account.dPermissions['all'] = allPermissions;

        return account.dPermissions;
    }
}