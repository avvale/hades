import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateRolesCommand } from '@hades/cci/role/application/create/create-roles.command';
import { SeederModule } from './seeder.module';
import { roles } from '@hades/cci/role/infrastructure/seeds/role.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateRolesCommand(roles));
        });
    }
}
new Seeder().main();