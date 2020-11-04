import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateSystemsCommand } from '@hades/cci/system/application/create/create-systems.command';
import { SeederModule } from './seeder.module';
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateSystemsCommand(systems));
        });
    }
}
new Seeder().main();