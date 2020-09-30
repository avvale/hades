import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { SeederModule } from './seeder.module';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';
import { CreatePermissionsCommand } from '@hades/iam/permission/application/create/create-permissions.command';
import { CreatePermissionsRolesCommand } from '@hades/iam/permission/application/create/create-permissions-roles.command';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { boundedContexts } from '@hades/admin/shared/infrastructure/seeds/bounded-context.seed';
import { permissions } from '@hades/admin/shared/infrastructure/seeds/permission.seed';

// commands
import { CreateLangsCommand } from '@hades/admin/lang/application/create/create-langs.command';

// sources
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext => {
            const commandBus    = appContext.get(ICommandBus);
            const queryBus      = appContext.get(IQueryBus);

            await this.commonActions(commandBus, queryBus);

            commandBus.dispatch(new CreateLangsCommand(langs));
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