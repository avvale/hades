import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeleteBoundedContextsCommand } from '@hades/iam/bounded-context/application/delete/delete-bounded-contexts.command';
import { GetBoundedContextsQuery } from '@hades/iam/bounded-context/application/get/get-bounded-contexts.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('iam.boundedContext.delete')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class DeleteBoundedContextsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteBoundedContexts')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, )
    {
        const boundedContexts = await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement, constraint));

        await this.commandBus.dispatch(new DeleteBoundedContextsCommand(queryStatement, constraint));

        return boundedContexts;
    }
}