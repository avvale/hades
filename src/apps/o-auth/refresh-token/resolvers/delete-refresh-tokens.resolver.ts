import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeleteRefreshTokensCommand } from '@hades/o-auth/refresh-token/application/delete/delete-refresh-tokens.command';
import { GetRefreshTokensQuery } from '@hades/o-auth/refresh-token/application/get/get-refresh-tokens.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('oAuth.refreshToken.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteRefreshTokensResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteRefreshTokens')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, )
    {
        const refreshTokens = await this.queryBus.ask(new GetRefreshTokensQuery(queryStatement, constraint));

        await this.commandBus.dispatch(new DeleteRefreshTokensCommand(queryStatement, constraint));

        return refreshTokens;
    }
}