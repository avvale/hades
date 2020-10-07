import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { SeederModule } from './seeder.module';

// commands
import { CreateAccountsCommand } from '@hades/iam/account/application/create/create-accounts.command';

// resources
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';

export class Seeder 
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAccountsCommand(accounts));
        });
    }
}
new Seeder().main();