import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindClientQuery } from '@hades/o-auth/client/application/find/find-client.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { OAuthClient } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.client.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindClientResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindClient')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, ): Promise<OAuthClient>
    {
        return await this.queryBus.ask(new FindClientQuery(queryStatement, constraint));
    }
}