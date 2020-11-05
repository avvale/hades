import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccessTokensQuery } from '@hades/o-auth/access-token/application/get/get-access-tokens.query';
import { OAuthAccessToken } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.accessToken.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthGetAccessTokensResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('oAuthGetAccessTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken[]>
    {
        return await this.queryBus.ask(new GetAccessTokensQuery(queryStatement, constraint, { timezone }));
    }
}