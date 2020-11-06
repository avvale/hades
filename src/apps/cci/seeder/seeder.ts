import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { IamUtils } from '@hades/iam/shared/domain/lib/iam-utils';
import { SeederModule } from './seeder.module';

// sources
import { boundedContexts } from '@hades/cci/shared/infrastructure/seeds/bounded-context.seed';
import { permissions } from '@hades/cci/shared/infrastructure/seeds/permission.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext => {
            const commandBus    = appContext.get(ICommandBus);
            const queryBus      = appContext.get(IQueryBus);

            await IamUtils.iamCommonSeed(commandBus, queryBus, boundedContexts, permissions);
        });
    }
}
new Seeder().main();