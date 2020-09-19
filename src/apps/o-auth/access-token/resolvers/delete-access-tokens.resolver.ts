import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccessTokensQuery } from '@hades/o-auth/access-token/application/get/get-access-tokens.query';
import { DeleteAccessTokensCommand } from '@hades/o-auth/access-token/application/delete/delete-access-tokens.command';

@Resolver()
export class DeleteAccessTokensResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteAccessTokens')
    async main(@Args('query') queryStatement: QueryStatement)
    {
        const accessTokens = await this.queryBus.ask(new GetAccessTokensQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteAccessTokensCommand(queryStatement));

        return accessTokens;
    }
}