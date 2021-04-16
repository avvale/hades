// ignored file
import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAccessTokensCommand } from '@hades/o-auth/access-token/application/create/create-access-tokens.command';
import { SeederModule } from './seeder.module';
import { accessTokensToCreate } from '@hades/o-auth/access-token/infrastructure/seeds/access-token-to-create.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAccessTokensCommand(accessTokensToCreate));
        });
    }
}
new Seeder().main();