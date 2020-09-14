import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthUpdateAccessTokenInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateAccessTokenCommand } from '@hades/o-auth/access-token/application/update/update-access-token.command';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';

@Resolver()
export class UpdateAccessTokenResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthUpdateAccessToken')
    async main(@Args('payload') payload: OAuthUpdateAccessTokenInput)
    {
        await this.commandBus.dispatch(new UpdateAccessTokenCommand(
            payload.id,
            payload.clientId,
            payload.token,
            payload.name,
            payload.isRevoked,
            payload.expiresAt,
            
        ));
        
        return await this.queryBus.ask(new FindAccessTokenByIdQuery(payload.id));
    }
}