import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { SeederModule } from './seeder.module';
import { IamUtils } from '@hades/iam/shared/domain/lib/iam-utils';

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
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext => {
            const commandBus = appContext.get(ICommandBus);
            const queryBus = appContext.get(IQueryBus);

            const administratorAccount = await queryBus.ask(new FindAccountByIdQuery(IamUtils.administratorAccountId));

            if (administratorAccount) 
            {
                await IamUtils.iamCommonSeed(commandBus, queryBus, boundedContexts, permissions);
            }
            else
            {
                await commandBus.dispatch(new CreateAccountsCommand(accounts));
                await commandBus.dispatch(new CreateUsersCommand(users));
                
                await commandBus.dispatch(new CreateRolesCommand(roles));
                
                // set all roles to administration account
                const rolesAccounts = roles.map(role => {
                    return {
                        roleId: role.id,
                        accountId: IamUtils.administratorRoleId
                    }
                });
                await commandBus.dispatch(new CreateRolesAccountsCommand(rolesAccounts));
    
                await IamUtils.iamCommonSeed(commandBus, queryBus, boundedContexts, permissions);
            }
        });
    }
}
new Seeder().main();