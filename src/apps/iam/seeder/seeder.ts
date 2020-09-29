import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAccountsCommand } from '@hades/iam/account/application/create/create-accounts.command';
import { CreateUsersCommand } from '@hades/iam/user/application/create/create-users.command';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';
import { CreateRolesCommand } from '@hades/iam/role/application/create/create-roles.command';
import { CreatePermissionsCommand } from '@hades/iam/permission/application/create/create-permissions.command';
import { CreatePermissionsRolesCommand } from '@hades/iam/permission/application/create/create-permissions-roles.command';
import { CreateRolesAccountsCommand } from '@hades/iam/role/application/create/create-roles-accounts.command';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { SeederModule } from './seeder.module';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';
import { boundedContexts } from '@hades/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';
import { permissions } from '@hades/iam/permission/infrastructure/seeds/permission.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);

            commandBus.dispatch(new CreateBoundedContextsCommand(boundedContexts));
            commandBus.dispatch(new CreatePermissionsCommand(permissions));
            commandBus.dispatch(new CreateRolesCommand(roles));
            commandBus.dispatch(new CreateAccountsCommand(accounts));
            commandBus.dispatch(new CreateUsersCommand(users));

            // set all permissions to administration role
            const permissionsRoles = permissions.map(permission => {
                return {
                    permissionId: permission.id,
                    roleId: '99b06044-fff5-4267-9314-4bae9f909010'
                }
            });
            commandBus.dispatch(new CreatePermissionsRolesCommand(permissionsRoles));

            // set all roles to administration account
            const rolesAccounts = roles.map(role => {
                return {
                    roleId: role.id,
                    accountId: '948a5308-a49d-42dc-9ea3-7490e120000b'
                }
            });
            commandBus.dispatch(new CreateRolesAccountsCommand(rolesAccounts));

            // set all permissions to accounts in default application and update account
            commandBus.dispatch(new UpdateAccountCommand(
                '948a5308-a49d-42dc-9ea3-7490e120000b',
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                { default: permissions.map(permission => permission.id) }
            ));
        });
    }
}
new Seeder().main();