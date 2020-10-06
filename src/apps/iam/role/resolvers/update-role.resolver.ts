import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamUpdateRoleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateRoleCommand } from '@hades/iam/role/application/update/update-role.command';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { IamRoleModel } from '@hades/iam/role/infrastructure/sequelize/sequelize-role.model';
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { PermissionResponse } from '@hades/iam/permission/domain/permission.response';
import { GetPermissionsQuery } from '@hades/iam/permission/application/get/get-permissions.query';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { AccountPermissions } from '@hades/iam/account/domain/lib/account.types';

@Resolver()
export class UpdateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdateRole')
    async main(@Args('payload') payload: IamUpdateRoleInput)
    {

        // get all accounts
        const accounts: AccountResponse[] = await this.queryBus.ask(new GetAccountsQuery({
            attributes: ['id', 'type', 'email', 'isActive', 'clientId', 'applicationCodes', 'permissions'],
            include: {
                model: IamRoleModel,
                as: 'roles',
                where: { 
                    id: payload.id
                }
            }
        }));

        // get permissions assigned to this role
        const permissions: PermissionResponse[] = await this.queryBus.ask(new GetPermissionsQuery({
            where: { 
                id: payload.permissionIds
            }
        }));

        // iterate each account
        for (const account of accounts)
        {
            // TODO gestionar el proceso de actualizacion en una cola
            const accountPermissions = this.updatePermissions(payload.id, permissions, account);

            await this.commandBus.dispatch(new UpdateAccountCommand(
                account.id,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                accountPermissions
            ));
        }
        
        await this.commandBus.dispatch(new UpdateRoleCommand(
            payload.id,
            payload.name,
            payload.isMaster,
            payload.permissionIds,
            payload.accountIds,
            
        ));
        
        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }

    private updatePermissions(roleId: string, newPermissions: PermissionResponse[], account: AccountResponse): AccountPermissions
    {
        // set new permissions from current role for each account
        account.permissions[roleId] = newPermissions.map(permission => permission.name);
            
        // container for all permissions
        const allPermissions = [];

        // iterate each role from account
        for (const index in account.permissions)
        {
            // avoid iterate all index, is the key that contain all permissions 
            if (index !== 'all')
            {
                for (const permission of account.permissions[index])
                {
                    if (allPermissions.indexOf(permission) === -1) allPermissions.push(permission);
                }
            }
        }
        // set all permissions
        account.permissions['all'] = allPermissions;

        return account.permissions;
    }
}