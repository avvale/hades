import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';
import { SeederModule } from './seeder.module';
import { boundedContexts } from '@hades/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateBoundedContextsCommand(boundedContexts));
        });
    }
}
new Seeder().main();