import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { SeederModule } from './seeder.module';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';
import { CreatePermissionsCommand } from '@hades/iam/permission/application/create/create-permissions.command';
import { CreatePermissionsRolesCommand } from '@hades/iam/permission/application/create/create-permissions-roles.command';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';

// commands
import { CreateAccountsCommand } from '@hades/iam/account/application/create/create-accounts.command';
import { CreateUsersCommand } from '@hades/iam/user/application/create/create-users.command';
import { CreateRolesCommand } from '@hades/iam/role/application/create/create-roles.command';
import { CreateRolesAccountsCommand } from '@hades/iam/role/application/create/create-roles-accounts.command';

// sources
import { boundedContexts } from '@hades/iam/shared/infrastructure/seeds/bounded-context.seed';
import { permissions } from '@hades/iam/shared/infrastructure/seeds/permission.seed';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext => {
            const commandBus = appContext.get(ICommandBus);
            const queryBus = appContext.get(IQueryBus);

            await commandBus.dispatch(new CreateAccountsCommand(accounts));
            await commandBus.dispatch(new CreateUsersCommand(users));
            
            await commandBus.dispatch(new CreateRolesCommand(roles));
            
            // set all roles to administration account
            const rolesAccounts = roles.map(role => {
                return {
                    roleId: role.id,
                    accountId: '948a5308-a49d-42dc-9ea3-7490e120000b'
                }
            });
            await commandBus.dispatch(new CreateRolesAccountsCommand(rolesAccounts));

            // call common action after create account admin and role admin
            this.commonActions(commandBus, queryBus)
        });
    }

    async commonActions(commandBus:ICommandBus, queryBus:IQueryBus)
    {
        commandBus.dispatch(new CreateBoundedContextsCommand(boundedContexts));
        commandBus.dispatch(new CreatePermissionsCommand(permissions));

        // set all permissions to administration role
        const permissionsRoles = permissions.map(permission => {
            return {
                permissionId: permission.id,
                roleId: '99b06044-fff5-4267-9314-4bae9f909010'
            }
        });
        commandBus.dispatch(new CreatePermissionsRolesCommand(permissionsRoles));

        // set all permissions to administration account
        const account = await queryBus.ask(new FindAccountByIdQuery('948a5308-a49d-42dc-9ea3-7490e120000b'));
        commandBus.dispatch(new UpdateAccountCommand(
            '948a5308-a49d-42dc-9ea3-7490e120000b',
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            account.permissions.concat(permissions)
        ));
    }
}
new Seeder().main();