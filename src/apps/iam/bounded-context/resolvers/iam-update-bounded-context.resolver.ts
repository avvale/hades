import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateBoundedContextCommand } from '@hades/iam/bounded-context/application/update/update-bounded-context.command';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { IamUpdateBoundedContextInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateBoundedContextResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdateBoundedContext')
    async main(@Args('payload') payload: IamUpdateBoundedContextInput, @Args('constraint') constraint?: QueryStatement)
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