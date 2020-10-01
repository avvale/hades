import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateChannelsOverviewCommand } from '@hades/cci/channel-overview/application/create/create-channels-overview.command';
import { SeederModule } from './seeder.module';
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateChannelsOverviewCommand(channelsOverview));
        });
    }
}
new Seeder().main();