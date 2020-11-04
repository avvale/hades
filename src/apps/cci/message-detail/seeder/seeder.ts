import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateMessagesDetailCommand } from '@hades/cci/message-detail/application/create/create-messages-detail.command';
import { SeederModule } from './seeder.module';
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateMessagesDetailCommand(messagesDetail));
        });
    }
}
new Seeder().main();