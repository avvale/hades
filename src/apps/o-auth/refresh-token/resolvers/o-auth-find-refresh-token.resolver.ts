import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRefreshTokenQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { OAuthRefreshToken } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.refreshToken.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindRefreshTokenResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('oAuthFindRefreshToken')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken>
    {
        return await this.queryBus.ask(new FindRefreshTokenQuery(queryStatement, constraint, { timezone }));
    }
}