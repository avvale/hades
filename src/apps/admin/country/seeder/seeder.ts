import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateCountriesCommand } from '@hades/admin/country/application/create/create-countries.command';
import { SeederModule } from './seeder.module';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateCountriesCommand(countries));
        });
    }
}
new Seeder().main();