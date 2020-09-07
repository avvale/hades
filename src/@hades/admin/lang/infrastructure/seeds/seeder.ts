import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { AppModule } from 'src/app.module';
import { langs } from './lang.seed';
import { CreateLangsCommand } from '../../application/create/create-langs.command';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(AppModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateLangsCommand(langs));
        });
    }
}
new Seeder().main();