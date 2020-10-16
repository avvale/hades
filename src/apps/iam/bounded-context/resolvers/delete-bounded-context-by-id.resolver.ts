import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { DeleteBoundedContextByIdCommand } from '@hades/iam/bounded-context/application/delete/delete-bounded-context-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('iam.boundedContext.delete')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class DeleteBoundedContextByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteBoundedContextById')
    async main(@Args('id') id: string, @Args('constraint') constraint?: QueryStatement, )
    {
        const boundedContext = await this.queryBus.ask(new FindBoundedContextByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteBoundedContextByIdCommand(id, constraint));

        return boundedContext;
    }
}