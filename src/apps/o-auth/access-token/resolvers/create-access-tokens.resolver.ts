import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateAccessTokenInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateAccessTokensCommand } from '@hades/o-auth/access-token/application/create/create-access-tokens.command';

@Resolver()
export class CreateAccessTokensResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateAccessTokens')
    async main(@Args('payload') payload: OAuthCreateAccessTokenInput[])
    {
        await this.commandBus.dispatch(new CreateAccessTokensCommand(payload));
        return true;
    }
}