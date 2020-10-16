import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRefreshTokenByIdQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { DeleteRefreshTokenByIdCommand } from '@hades/o-auth/refresh-token/application/delete/delete-refresh-token-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('oAuth.refreshToken.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteRefreshTokenByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteRefreshTokenById')
    async main(@Args('id') id: string, @Args('constraint') constraint?: QueryStatement, )
    {
        const refreshToken = await this.queryBus.ask(new FindRefreshTokenByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteRefreshTokenByIdCommand(id, constraint));

        return refreshToken;
    }
}