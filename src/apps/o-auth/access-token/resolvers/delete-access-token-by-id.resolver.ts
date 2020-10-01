import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';
import { DeleteAccessTokenByIdCommand } from '@hades/o-auth/access-token/application/delete/delete-access-token-by-id.command';

@Resolver()
export class DeleteAccessTokenByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteAccessTokenById')
    async main(@Args('id') id: string)
    {
        const accessToken = await this.queryBus.ask(new FindAccessTokenByIdQuery(id));

        await this.commandBus.dispatch(new DeleteAccessTokenByIdCommand(id));

        return accessToken;
    }
}