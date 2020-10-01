import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRefreshTokenByIdQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { DeleteRefreshTokenByIdCommand } from '@hades/o-auth/refresh-token/application/delete/delete-refresh-token-by-id.command';

@Resolver()
export class DeleteRefreshTokenByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteRefreshTokenById')
    async main(@Args('id') id: string)
    {
        const refreshToken = await this.queryBus.ask(new FindRefreshTokenByIdQuery(id));

        await this.commandBus.dispatch(new DeleteRefreshTokenByIdCommand(id));

        return refreshToken;
    }
}