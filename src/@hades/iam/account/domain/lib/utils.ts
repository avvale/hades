
import { RoleResponse } from '@hades/iam/role/domain/role.response';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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

    public static async deleteTenantFromAccounts(commandBus: ICommandBus, tenantId: string,  accounts: AccountResponse[], constraint?: QueryStatement, cQMetadata?: CQMetadata)
    {
        for (const account of accounts)
        {
            // check that tenant exist in account
            if (account.dTenants.indexOf(tenantId) !== -1)
            {
                const currentTenants = account.dTenants;

                // delete tenant and update account
                await commandBus.dispatch(new UpdateAccountCommand({
                    id: account.id,
                    type: undefined,
                    email: undefined,
                    isActive: undefined,
                    clientId: undefined,
                    dApplicationCodes: undefined,
                    dPermissions: undefined,
                    data: undefined,
                    roleIds: undefined,
                    tenantIds: currentTenants.filter(tenantId => tenantId !== tenantId)
                }, constraint, cQMetadata));
            }
        }
    }
}