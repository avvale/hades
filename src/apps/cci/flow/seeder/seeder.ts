import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateFlowsCommand } from '@hades/cci/flow/application/create/create-flows.command';
import { SeederModule } from './seeder.module';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateFlowsCommand(flows));
        });
    }
}
new Seeder().main();