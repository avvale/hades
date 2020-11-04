import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateChannelsDetailCommand } from '@hades/cci/channel-detail/application/create/create-channels-detail.command';
import { SeederModule } from './seeder.module';
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateChannelsDetailCommand(channelsDetail));
        });
    }
}
new Seeder().main();