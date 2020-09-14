import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateRefreshTokenInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateRefreshTokensCommand } from '@hades/o-auth/refresh-token/application/create/create-refresh-tokens.command';

@Resolver()
export class CreateRefreshTokensResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateRefreshTokens')
    async main(@Args('payload') payload: OAuthCreateRefreshTokenInput[])
    {
        await this.commandBus.dispatch(new CreateRefreshTokensCommand(payload));
        return true;
    }
}