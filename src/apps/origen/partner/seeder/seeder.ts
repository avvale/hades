import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreatePartnersCommand } from '@hades/origen/partner/application/create/create-partners.command';
import { SeederModule } from './seeder.module';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreatePartnersCommand(partners));
        });
    }
}
new Seeder().main();