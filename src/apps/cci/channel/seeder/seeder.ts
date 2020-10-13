import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { SeederModule } from './seeder.module';

// commands
import { CreateChannelsCommand } from '@hades/cci/channel/application/create/create-channels.command';

// resources
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateChannelsCommand(channels));
        });
    }
}
new Seeder().main();