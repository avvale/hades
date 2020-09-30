import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { SeederModule } from './seeder.module';

// commands
import { CreateLangsCommand } from '@hades/admin/lang/application/create/create-langs.command';

// sources
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);

            commandBus.dispatch(new CreateLangsCommand(langs));
        });
    }
}
new Seeder().main();