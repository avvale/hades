import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateClientsQuery } from '@hades/o-auth/client/application/paginate/paginate-clients.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.client.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class PaginateClientsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthPaginateClients')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateClientsQuery(queryStatement, constraint));   
    }
}