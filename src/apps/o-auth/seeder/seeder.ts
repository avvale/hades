import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { SeederModule } from './seeder.module';
import { IamUtils } from '@hades/iam/shared/domain/lib/iam-utils';

// commands
import { CreateApplicationsCommand } from '@hades/o-auth/application/application/create/create-applications.command';
import { CreateClientsCommand } from '@hades/o-auth/client/application/create/create-clients.command';

// sources
import { boundedContexts } from '@hades/o-auth/shared/infrastructure/seeds/bounded-context.seed';
import { permissions } from '@hades/o-auth/shared/infrastructure/seeds/permission.seed';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext => {
            const commandBus    = appContext.get(ICommandBus);
            const queryBus      = appContext.get(IQueryBus);

            await IamUtils.iamCommonSeed(commandBus, queryBus, boundedContexts, permissions);

            await commandBus.dispatch(new CreateApplicationsCommand(applications));
            await commandBus.dispatch(new CreateClientsCommand(clients));
        });
    }
}
new Seeder().main();