import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAccountsCommand } from '@hades/iam/account/application/create/create-accounts.command';
import { CreateUsersCommand } from '@hades/iam/user/application/create/create-users.command';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';
import { CreateRolesCommand } from '@hades/iam/role/application/create/create-roles.command';
import { CreatePermissionsCommand } from '@hades/iam/permission/application/create/create-permissions.command';
import { CreatePermissionsRolesCommand } from '@hades/iam/permission/application/create/create-permissions-roles.command';
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
            commandBus.dispatch(new CreateAccountsCommand(accounts));
            commandBus.dispatch(new CreateUsersCommand(users));
            commandBus.dispatch(new CreateRolesCommand(roles));
            
            // set all permissions to admin user
            const permissionsRoles = permissions.map(permission => {
                return {
                    permissionId: permission.id,
                    roleId: '99b06044-fff5-4267-9314-4bae9f909010'
                }
            });
            commandBus.dispatch(new CreatePermissionsRolesCommand(permissionsRoles));
            
        });
    }
}
new Seeder().main();