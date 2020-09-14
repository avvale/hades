import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetRefreshTokensQuery } from '@hades/o-auth/refresh-token/application/get/get-refresh-tokens.query';
import { DeleteRefreshTokensCommand } from '@hades/o-auth/refresh-token/application/delete/delete-refresh-tokens.command';

@Resolver()
export class DeleteRefreshTokensResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteRefreshTokens')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const refreshTokens = await this.queryBus.ask(new GetRefreshTokensQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteRefreshTokensCommand(queryStatements));

        return refreshTokens;
    }
}