import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreatePermissionsCommand } from '@hades/admin/permission/application/create/create-permissions.command';
import { SeederModule } from './seeder.module';
import { permissions } from '@hades/admin/permission/infrastructure/seeds/permission.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreatePermissionsCommand(permissions));
        });
    }
}
new Seeder().main();