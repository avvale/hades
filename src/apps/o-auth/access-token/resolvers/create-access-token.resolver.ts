import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateAccessTokenInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateAccessTokenCommand } from '@hades/o-auth/access-token/application/create/create-access-token.command';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';

@Resolver()
export class CreateAccessTokenResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateAccessToken')
    async main(@Args('payload') payload: OAuthCreateAccessTokenInput)
    {
        await this.commandBus.dispatch(new CreateAccessTokenCommand(
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