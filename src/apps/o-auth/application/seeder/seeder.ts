import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateApplicationsCommand } from '@hades/o-auth/application/application/create/create-applications.command';
import { SeederModule } from './seeder.module';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateApplicationsCommand(applications));
        });
    }
}
new Seeder().main();