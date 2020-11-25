import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateResourcesCommand } from '@hades/admin/resource/application/create/create-resources.command';
import { SeederModule } from './seeder.module';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateResourcesCommand(resources));
        });
    }
}
new Seeder().main();