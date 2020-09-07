import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { langs } from './lang.seed';
import { CreateLangsCommand } from '../../application/create/create-langs.command';
import { SeederModule } from './seeder.module';

export class Seeder 
{
    main()
    {
        console.log('OK');
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateLangsCommand(langs));
        });
    }
}
new Seeder().main();