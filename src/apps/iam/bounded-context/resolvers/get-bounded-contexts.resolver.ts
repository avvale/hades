import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { GetBoundedContextsQuery } from '@hades/iam/bounded-context/application/get/get-bounded-contexts.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IamBoundedContext } from './../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.get')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class GetBoundedContextsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamGetBoundedContexts')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, ): Promise<IamBoundedContext[]>
    {
        return await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement, constraint));
    }
}