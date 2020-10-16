import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IamBoundedContext } from './../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.get')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class FindBoundedContextByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindBoundedContextById')
    async main(@Args('id') id: string, @Args('constraint') constraint?: QueryStatement, ): Promise<IamBoundedContext>
    {
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(id, constraint));
    }
}