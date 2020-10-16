import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateApplicationsQuery } from '@hades/o-auth/application/application/paginate/paginate-applications.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class PaginateApplicationsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthPaginateApplications')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateApplicationsQuery(queryStatement, constraint));   
    }
}