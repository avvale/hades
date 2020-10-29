import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateExecutionsCommand } from '@hades/cci/execution/application/create/create-executions.command';
import { SeederModule } from './seeder.module';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateExecutionsCommand(executions));
        });
    }
}
new Seeder().main();