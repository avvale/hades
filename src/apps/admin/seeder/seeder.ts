import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { SeederModule } from './seeder.module';
import { IamUtils } from '@hades/iam/shared/domain/lib/iam-utils';

// commands
import { CreateLangsCommand } from '@hades/admin/lang/application/create/create-langs.command';
import { CreateCountriesCommand } from '@hades/admin/country/application/create/create-countries.command';
import { CreateAdministrativeAreasLevel1Command } from '@hades/admin/administrative-area-level-1/application/create/create-administrative-areas-level-1.command';

// sources
import { boundedContexts } from '@hades/admin/shared/infrastructure/seeds/bounded-context.seed';
import { permissions } from '@hades/admin/shared/infrastructure/seeds/permission.seed';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { administrativeAreasLevel101, administrativeAreasLevel102, administrativeAreasLevel103, administrativeAreasLevel104, administrativeAreasLevel105 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext => {
            const commandBus    = appContext.get(ICommandBus);
            const queryBus      = appContext.get(IQueryBus);

            await IamUtils.iamCommonSeed(commandBus, queryBus, boundedContexts, permissions);

            await commandBus.dispatch(new CreateLangsCommand(langs));
            await commandBus.dispatch(new CreateCountriesCommand(countries));
            await (() => {
                commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel101));
                commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel102));
                commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel103));
                commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel104));
                commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel105));
            })();
            
        });
    }
}
new Seeder().main();