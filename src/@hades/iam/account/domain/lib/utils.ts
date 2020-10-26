
import { RoleResponse } from '@hades/iam/role/domain/role.response';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { UpdateAccountCommand } from '../../application/update/update-account.command';
import { AccountResponse } from '../account.response';
import { AccountPermissions } from './account.types';

export class Utils
{
    public static createPermissions(roles: RoleResponse[]): AccountPermissions
    {
        // create permission for new account
        const accountPermissions: AccountPermissions = {all: []};
        const allPermissions = [];

        // iterate roles
        for (const role of roles)
        {
            const rolePermissions = [];
            // iterate permissions of each role
            for (const permission of role.permissions)
            {
                rolePermissions.push(permission.name);
                if (allPermissions.indexOf(permission.name) === -1) allPermissions.push(permission.name);
            }
            accountPermissions[role.id] = rolePermissions;
        }
        accountPermissions.all = allPermissions;

        return accountPermissions;
    }

    public static async deleteTenantFromAccounts(commandBus: ICommandBus, tenantId: string,  accounts: AccountResponse[])
    {
        for (const account of accounts)
        {
            // check that tenant exist in account
            if (account.dTenants.indexOf(tenantId) !== -1)
            {
                const currentTenants = account.dTenants;

                // delete tenan and update account
                await commandBus.dispatch(new UpdateAccountCommand(
                    account.id,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    currentTenants.filter(tenantId => tenantId !== tenantId)
                ));
            }
        }
    }
}