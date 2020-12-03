import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAdministrativeAreasLevel3Command } from '@hades/admin/administrative-area-level-3/application/create/create-administrative-areas-level-3.command';
import { SeederModule } from './seeder.module';
import { administrativeAreasLevel3 } from '@hades/admin/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAdministrativeAreasLevel3Command(administrativeAreasLevel3));
        });
    }
}
new Seeder().main();