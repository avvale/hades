import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateBoundedContextsQuery } from '@hades/iam/bounded-context/application/paginate/paginate-bounded-contexts.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.get')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class PaginateBoundedContextsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamPaginateBoundedContexts')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateBoundedContextsQuery(queryStatement, constraint));   
    }
}