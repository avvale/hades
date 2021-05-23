// ignored file
import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAdministrativeAreasLevel2Command } from '@hades/admin/administrative-area-level-2/application/create/create-administrative-areas-level-2.command';
import { SeederModule } from './seeder.module';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext => {
            const commandBus = appContext.get(ICommandBus);
            await commandBus.dispatch(new CreateAdministrativeAreasLevel2Command(administrativeAreasLevel2));
        });
    }
}
new Seeder().main();