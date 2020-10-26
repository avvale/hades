import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateTenantsCommand } from '@hades/iam/tenant/application/create/create-tenants.command';
import { SeederModule } from './seeder.module';
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateTenantsCommand(tenants));
        });
    }
}
new Seeder().main();