import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { SeederModule } from './seeder.module';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';
import { CreatePermissionsCommand } from '@hades/iam/permission/application/create/create-permissions.command';
import { CreatePermissionsRolesCommand } from '@hades/iam/permission/application/create/create-permissions-roles.command';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { IamUtils } from '@hades/iam/shared/domain/lib/iam-utils';

// commands
import { CreateLangsCommand } from '@hades/admin/lang/application/create/create-langs.command';

// sources
import { boundedContexts } from '@hades/admin/shared/infrastructure/seeds/bounded-context.seed';
import { permissions } from '@hades/admin/shared/infrastructure/seeds/permission.seed';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext => {
            const commandBus    = appContext.get(ICommandBus);
            const queryBus      = appContext.get(IQueryBus);

            await IamUtils.iamCommonSeed(commandBus, queryBus, boundedContexts, permissions);

            await commandBus.dispatch(new CreateLangsCommand(langs));
        }); 
    }
}
new Seeder().main();