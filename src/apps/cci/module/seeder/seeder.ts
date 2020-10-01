import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateModulesCommand } from '@hades/cci/module/application/create/create-modules.command';
import { SeederModule } from './seeder.module';
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateModulesCommand(modules));
        });
    }
}
new Seeder().main();