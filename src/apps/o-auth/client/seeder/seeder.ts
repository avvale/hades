import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateClientsCommand } from '@hades/o-auth/client/application/create/create-clients.command';
import { SeederModule } from './seeder.module';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateClientsCommand(clients));
        });
    }
}
new Seeder().main();