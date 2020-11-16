import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAccessTokensCommand } from '@hades/o-auth/access-token/application/create/create-access-tokens.command';
import { SeederModule } from './seeder.module';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAccessTokensCommand(accessTokens));
        });
    }
}
new Seeder().main();