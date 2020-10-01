import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateUsersCommand } from '@hades/iam/user/application/create/create-users.command';
import { SeederModule } from './seeder.module';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateUsersCommand(users));
        });
    }
}
new Seeder().main();