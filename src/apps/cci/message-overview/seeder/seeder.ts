import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateMessagesOverviewCommand } from '@hades/cci/message-overview/application/create/create-messages-overview.command';
import { SeederModule } from './seeder.module';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateMessagesOverviewCommand(messagesOverview));
        });
    }
}
new Seeder().main();