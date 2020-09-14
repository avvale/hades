import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthUpdateRefreshTokenInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateRefreshTokenCommand } from '@hades/o-auth/refresh-token/application/update/update-refresh-token.command';
import { FindRefreshTokenByIdQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';

@Resolver()
export class UpdateRefreshTokenResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthUpdateRefreshToken')
    async main(@Args('payload') payload: OAuthUpdateRefreshTokenInput)
    {
        await this.commandBus.dispatch(new UpdateRefreshTokenCommand(
            payload.id,
            payload.accessTokenId,
            payload.token,
            payload.isRevoked,
            payload.expiresAt,
            
        ));
        
        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(payload.id));
    }
}