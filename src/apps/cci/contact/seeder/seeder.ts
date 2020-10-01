import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateContactsCommand } from '@hades/cci/contact/application/create/create-contacts.command';
import { SeederModule } from './seeder.module';
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateContactsCommand(contacts));
        });
    }
}
new Seeder().main();