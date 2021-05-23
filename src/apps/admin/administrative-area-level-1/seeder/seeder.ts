// ignored file
import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAdministrativeAreasLevel1Command } from '@hades/admin/administrative-area-level-1/application/create/create-administrative-areas-level-1.command';
import { SeederModule } from './seeder.module';
import { administrativeAreasLevel1, administrativeAreasLevel101, administrativeAreasLevel102, administrativeAreasLevel103, administrativeAreasLevel104 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext => {
            const commandBus = appContext.get(ICommandBus);

            await (() => {
                commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel1)).catch(e => console.error);
                commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel101)).catch(e => console.error);
                commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel102)).catch(e => console.error);
                commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel103)).catch(e => console.error);
                commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel104)).catch(e => console.error);
            })();
        });
    }
}
new Seeder().main();