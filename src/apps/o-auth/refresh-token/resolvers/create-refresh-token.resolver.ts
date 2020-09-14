import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateRefreshTokenInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateRefreshTokenCommand } from '@hades/o-auth/refresh-token/application/create/create-refresh-token.command';
import { FindRefreshTokenByIdQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';

@Resolver()
export class CreateRefreshTokenResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateRefreshToken')
    async main(@Args('payload') payload: OAuthCreateRefreshTokenInput)
    {
        await this.commandBus.dispatch(new CreateRefreshTokenCommand(
            payload.id,
            payload.accessTokenId,
            payload.token,
            payload.isRevoked,
            payload.expiresAt,
            
        ));
        
        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(payload.id));
    }
}