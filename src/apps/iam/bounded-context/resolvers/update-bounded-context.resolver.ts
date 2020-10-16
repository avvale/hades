import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamUpdateBoundedContextInput } from './../../../../graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateBoundedContextCommand } from '@hades/iam/bounded-context/application/update/update-bounded-context.command';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';

@Resolver()
@Permissions('iam.boundedContext.update')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class UpdateBoundedContextResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdateBoundedContext')
    async main(@Args('payload') payload: IamUpdateBoundedContextInput, @Args('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateBoundedContextCommand(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            constraint,
        ));
        
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id, constraint));
    }
}