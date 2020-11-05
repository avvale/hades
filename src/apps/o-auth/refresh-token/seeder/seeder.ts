import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateRefreshTokensCommand } from '@hades/o-auth/refresh-token/application/create/create-refresh-tokens.command';
import { SeederModule } from './seeder.module';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext => {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateRefreshTokensCommand(refreshTokens));
        });
    }
}
new Seeder().main();